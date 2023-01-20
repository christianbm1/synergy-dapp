// import { Fetcher, Route, Token } from '@uniswap/sdk';
//import { Fetcher as FetcherSpirit, Token as TokenSpirit } from '@spiritswap/sdk';
import { Fetcher, Route, Token } from '@pancakeswap/sdk';
import { Configuration } from './config';
import { ContractName, TokenStat, AllocationTime, LPStat, Bank, PoolStats } from './types';
import { BigNumber, Contract, ethers, EventFilter } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getFullDisplayBalance, getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';

import config, { bankDefinitions } from '../config';
import moment from 'moment';
import { parseUnits } from 'ethers/lib/utils';
import { BNB_TICKER, SPOOKY_ROUTER_ADDR, CRS_TICKER } from '../utils/constants';
/**
 * An API module of Synergy Finance contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class SynergyFinance {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  boardroomVersionOfUser?: string;

  CRS_BUSD_LP: ERC20;
  DIA_BUSD_LP: ERC20;
  CRS: ERC20;
  DIA: ERC20;
  BNB: ERC20;
  BUSD: ERC20;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal);
    }
    this.CRS = new ERC20(deployments.Crystal.address, provider, 'CRS');
    this.DIA = new ERC20(deployments.Diamond.address, provider, 'DIA');
    this.BNB = this.externalTokens['WBNB'];
    this.BUSD = this.externalTokens['BUSD'];

    this.externalTokens["CRS"] = this.CRS;
    this.externalTokens["DIA"] = this.DIA;

    // Uniswap V2 Pair
    this.CRS_BUSD_LP = new ERC20(externalTokens['CRS/BUSD'][0], provider, 'CRS/BUSD');
    this.DIA_BUSD_LP = new ERC20(externalTokens['DIA/BUSD'][0], provider, 'DIA/BUSD');

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);
    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
    this.fetchBoardroomVersionOfUser()
      .then((version) => (this.boardroomVersionOfUser = version))
      .catch((err) => {
        console.error(`Failed to fetch boardroom version: ${err.stack}`);
        this.boardroomVersionOfUser = 'latest';
      });
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  //===================================================================
  //===================== GET ASSET STATS =============================
  //===================FROM APE TO DISPLAY =========================
  //=========================IN HOME PAGE==============================
  //===================================================================

  // async getCrystalStat(): Promise<TokenStat> {
  //   const { CrystalGenesisRewardPool } = this.contracts;
  //   const supply = await this.CRS.totalSupply();
  //   const crsRewardPoolSupply = await this.CRS.balanceOf(CrystalGenesisRewardPool.address);
  //   const crsCirculatingSupply = supply.sub(crsRewardPoolSupply);
  //   const priceInBUSD = await this.getTokenPriceFromPancakeswapBUSD(this.CRS);
  //   const priceOfOneBUSD = await this.getBUSDPriceFromPancakeswap();
  //   const priceOfCrystalInDollars = (Number(priceInBUSD) * Number(priceOfOneBUSD)).toFixed(2);

  //   return {
  //     tokenInFtm: priceInBUSD.toString(),
  //     priceInDollars: priceOfCrystalInDollars,
  //     totalSupply: getDisplayBalance(supply, this.CRS.decimal, 0),
  //     circulatingSupply: getDisplayBalance(crsCirculatingSupply, this.CRS.decimal, 0),
  //   };
  // }

  async getCrystalStat(): Promise<TokenStat> {
    const { CrystalGenesisRewardPool } = this.contracts;
    const supply = await this.CRS.totalSupply();
    const crsRewardPoolSupply = await this.CRS.balanceOf(CrystalGenesisRewardPool.address);
    const crsCirculatingSupply = supply.sub(crsRewardPoolSupply);
    const priceInBUSD = await this.getTokenPriceInBUSD(this.CRS, this.CRS_BUSD_LP);

    return {
      tokenInFtm: priceInBUSD.toString(),
      priceInDollars: Number(priceInBUSD).toFixed(2),
      totalSupply: getDisplayBalance(supply, this.CRS.decimal, 0),
      circulatingSupply: getDisplayBalance(crsCirculatingSupply, this.CRS.decimal, 0),
    };
  }

  /**
   * Calculates various stats for the requested LP
   * @param name of the LP token to load stats for
   * @returns
   */
  async getLPStat(name: string): Promise<LPStat> {
    const lpToken = this.externalTokens[name];
    const lpTokenSupplyBN = await lpToken.totalSupply();
    const lpTokenSupply = getDisplayBalance(lpTokenSupplyBN, 18);
    const tokenList = name.split("/");
    const token0 = this.externalTokens[tokenList[0]];
    const token1 = tokenList[1] === 'BNB' ? this.BNB : this.externalTokens[tokenList[1]];
    const isCrystal = name.startsWith('CRS');
    const token0AmountBN = await token0.balanceOf(lpToken.address);
    const token0Amount = getDisplayBalance(token0AmountBN, 18);

    const token1AmountBN = await token1.balanceOf(lpToken.address);
    const token1Amount = getDisplayBalance(token1AmountBN, 18);

    const tokenAmountInOneLP = Number(token0Amount) / Number(lpTokenSupply);
    const ftmAmountInOneLP = Number(token1Amount) / Number(lpTokenSupply);
    const lpTokenPrice = await this.getLPTokenPrice(lpToken, token0, isCrystal);
    const lpTokenPriceFixed = Number(lpTokenPrice).toFixed(2).toString();
    const liquidity = (Number(lpTokenSupply) * Number(lpTokenPrice)).toFixed(2).toString();
    return {
      tokenAmount: tokenAmountInOneLP.toFixed(2).toString(),
      ftmAmount: ftmAmountInOneLP.toFixed(2).toString(),
      priceOfOne: lpTokenPriceFixed,
      totalLiquidity: liquidity,
      totalSupply: Number(lpTokenSupply).toFixed(2).toString(),
    };
  }

  async getLPStatBUSD(name: string): Promise<LPStat> {
    const lpToken = this.externalTokens[name];
    const lpTokenSupplyBN = await lpToken.totalSupply();
    const lpTokenSupply = getDisplayBalance(lpTokenSupplyBN, 18);
    const token0 = name.startsWith('CRS') ? this.CRS : this.DIA;
    const isCrystal = name.startsWith('CRS');
    const tokenAmountBN = await token0.balanceOf(lpToken.address);
    const tokenAmount = getDisplayBalance(tokenAmountBN, 18);

    const btcAmountBN = await this.BUSD.balanceOf(lpToken.address);
    const btcAmount = getDisplayBalance(btcAmountBN, 18);
    const tokenAmountInOneLP = Number(tokenAmount) / Number(lpTokenSupply);
    const ftmAmountInOneLP = Number(btcAmount) / Number(lpTokenSupply);
    const lpTokenPrice = await this.getLPTokenPrice(lpToken, token0, isCrystal);

    const lpTokenPriceFixed = Number(lpTokenPrice).toFixed(2).toString();

    const liquidity = (Number(lpTokenSupply) * Number(lpTokenPrice)).toFixed(2).toString();

    return {
      tokenAmount: tokenAmountInOneLP.toFixed(2).toString(),
      ftmAmount: ftmAmountInOneLP.toFixed(5).toString(),
      priceOfOne: lpTokenPriceFixed,
      totalLiquidity: liquidity,
      totalSupply: Number(lpTokenSupply).toFixed(2).toString(),
    };
  }

  /**
   * @returns TokenStat for DIA
   * priceInBNB
   * priceInDollars
   * TotalSupply
   * CirculatingSupply (always equal to total supply for bonds)
   */
  async getShareStat(): Promise<TokenStat> {
    const { DiamondRewardPool } = this.contracts;

    const supply = await this.DIA.totalSupply();
    const crsRewardPoolSupply = await this.DIA.balanceOf(DiamondRewardPool.address);
    const diaCirculatingSupply = supply.sub(crsRewardPoolSupply);

    const { BUSD } = this.externalTokens;
    const diamond_busd_pair = this.externalTokens["DIA/BUSD"];
    let dia_amount_BN = await this.DIA.balanceOf(diamond_busd_pair.address);
    let dia_amount = Number(getFullDisplayBalance(dia_amount_BN, this.DIA.decimal));
    let busd_amount_BN = await BUSD.balanceOf(diamond_busd_pair.address);
    let busd_amount = Number(getFullDisplayBalance(busd_amount_BN, BUSD.decimal));
    const priceInBUSD = (busd_amount / dia_amount).toString();

    return {
      tokenInFtm: priceInBUSD,
      priceInDollars: Number(priceInBUSD).toFixed(2),
      totalSupply: getDisplayBalance(supply, this.DIA.decimal, 0),
      circulatingSupply: getDisplayBalance(diaCirculatingSupply, this.DIA.decimal, 0),
    };
  }

  async getCRSStatInEstimatedTWAP(): Promise<TokenStat> {
    const { Oracle, Treasury } = this.contracts;
    const expectedPrice = await Oracle.twap(this.CRS.address, ethers.utils.parseEther('1'));

    const supply = await this.CRS.totalSupply();
    const crsCirculatingSupply = await Treasury.getCRSCirculatingSupply();

    return {
      tokenInFtm: getDisplayBalance(expectedPrice),
      priceInDollars: getDisplayBalance(expectedPrice),
      totalSupply: getDisplayBalance(supply, this.CRS.decimal, 0),
      circulatingSupply: getDisplayBalance(crsCirculatingSupply, this.CRS.decimal, 0),
    };
  }

  async getCRSPriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getCRSUpdatedPrice();
  }

  /**
   * Calculates the TVL, APR and daily APR of a provided pool/bank
   * @param bank
   * @returns
   */
  async getPoolAPRs(bank: Bank): Promise<PoolStats> {
    if (this.myAccount === undefined) return;
    const depositToken = bank.depositToken;
    const poolContract = this.contracts[bank.contract];
    const depositTokenPrice = await this.getDepositTokenPriceInDollars(bank.depositTokenName, depositToken);
    const stakeInPool = await depositToken.balanceOf(bank.address);
    const TVL = Number(depositTokenPrice) * Number(getDisplayBalance(stakeInPool, depositToken.decimal));
    const stat = bank.earnTokenName === 'CRS' ? await this.getCrystalStat() : await this.getShareStat();
    const tokenPerSecond = await this.getTokenPerSecond(
      bank.earnTokenName,
      bank.poolId,
      poolContract,
    );

    const tokenPerHour = tokenPerSecond.mul(60).mul(60);
    const totalRewardPricePerYear =
      Number(stat.priceInDollars) * Number(getDisplayBalance(tokenPerHour.mul(24).mul(365)));
    const totalRewardPricePerWeek =
    Number(stat.priceInDollars) * Number(getDisplayBalance(tokenPerHour.mul(24).mul(7)));
    const totalRewardPricePerDay = Number(stat.priceInDollars) * Number(getDisplayBalance(tokenPerHour.mul(24)));
    const totalStakingTokenInPool =
      Number(depositTokenPrice) * Number(getDisplayBalance(stakeInPool, depositToken.decimal));
    const dailyAPR = (totalRewardPricePerDay / totalStakingTokenInPool) * 100;
    const yearlyAPR = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
    const weeklyAPR = (totalRewardPricePerWeek / totalStakingTokenInPool) * 100;
    return {
      dailyAPR: dailyAPR.toFixed(2).toString(),
      yearlyAPR: yearlyAPR.toFixed(2).toString(),
      weeklyAPR: weeklyAPR.toFixed(2).toString(),
      TVL: TVL.toFixed(2).toString(),
    };
  }

  /**
   * Method to return the amount of tokens the pool yields per second
   * @param earnTokenName the name of the token that the pool is earning
   * @param contractName the contract of the pool/bank
   * @param poolContract the actual contract of the pool
   * @returns
   */
  async getTokenPerSecond(
    earnTokenName: string,
    poolId: number,
    poolContract: Contract,
  ) {
    if (earnTokenName == 'CRS') {
      const totalAllockPoint = await poolContract.totalAllocPoint();
      const rewardPerSecond = await poolContract.crystalPerSecond();
      const poolInfo = await poolContract.poolInfo(poolId);
      return rewardPerSecond.mul(poolInfo.allocPoint).div(totalAllockPoint);
    } 

    const totalAllockPoint = await poolContract.totalAllocPoint();
    const rewardPerSecond = await poolContract.diamondPerSecond();
    const poolInfo = await poolContract.poolInfo(poolId);
    return rewardPerSecond.mul(poolInfo.allocPoint).div(totalAllockPoint);
  }

  /**
   * Method to calculate the tokenPrice of the deposited asset in a pool/bank
   * If the deposited token is an LP it will find the price of its pieces
   * @param tokenName
   * @param pool
   * @param token
   * @returns
   */
  async getDepositTokenPriceInDollars(tokenName: string, token: ERC20) {
    let tokenPrice;
    const priceOfOneFtmInDollars = await this.getWBNBPriceInBUSD();
    if (tokenName === 'WBNB') {
      tokenPrice = priceOfOneFtmInDollars;
    } else if (tokenName === 'CRS') {
      tokenPrice = await this.getTokenPriceInBUSD(this.CRS, this.CRS_BUSD_LP);
    } else if (tokenName === 'DIA') {
      tokenPrice = await this.getTokenPriceInBUSD(this.DIA, this.DIA_BUSD_LP);
    } else if (tokenName.includes("CRS/")) {
      tokenPrice = await this.getLPTokenPrice(token, this.CRS, true);
    } else if (tokenName.includes("DIA/")) {
      tokenPrice = await this.getLPTokenPrice(token, this.DIA, false);
    } else if (tokenName.includes("/")){
      if (tokenName.includes("BNB"))
        tokenPrice = this.getExtraLPTokenPrice(token, this.externalTokens["WBNB"], true);
      else if (tokenName.includes("BUSD"))
        tokenPrice = this.getExtraLPTokenPrice(token, this.externalTokens["BUSD"], false);
    } else {
      tokenPrice = await this.getTokenPriceFromPancakeswap(token);
      tokenPrice = (Number(tokenPrice) * Number(priceOfOneFtmInDollars)).toString();
    }

    return tokenPrice;
  }

  //===================================================================
  //===================== GET ASSET STATS =============================
  //=========================== END ===================================
  //===================================================================

  async getCurrentEpoch(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.epoch();
  }

  async getExpansionRate(_crystalPrice: string): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    if (_crystalPrice == null) {
      return null;
    }
    return await Treasury.getNextExpansionRate(decimalToBalance(_crystalPrice));
  }

  async getTotalValueLocked(): Promise<Number> {
    let totalValue = 0;
    for (const bankInfo of Object.values(bankDefinitions)) {
      const pool = this.contracts[bankInfo.contract];
      const token = this.externalTokens[bankInfo.depositTokenName];
      const tokenPrice = await this.getDepositTokenPriceInDollars(bankInfo.depositTokenName, token);
      const tokenAmountInPool = await token.balanceOf(pool.address);
      const value = Number(getDisplayBalance(tokenAmountInPool, token.decimal)) * Number(tokenPrice);
      const poolValue = Number.isNaN(value) ? 0 : value;
      totalValue += poolValue;
    }

    const DIAPrice = (await this.getShareStat()).priceInDollars;
    const CRSPrice = (await this.getCrystalStat()).priceInDollars;

    const boardroomDIABalanceOf = await this.DIA.balanceOf(this.currentBoardroom().address);
    const boardroomTVL = Number(getDisplayBalance(boardroomDIABalanceOf, this.DIA.decimal)) * Number(DIAPrice);

    return totalValue + boardroomTVL;
  }

  /**
   * Calculates the price of an LP token
   * Reference https://github.com/DefiDebauchery/discordpricebot/blob/4da3cdb57016df108ad2d0bb0c91cd8dd5f9d834/pricebot/pricebot.py#L150
   * @param lpToken the token under calculation
   * @param token the token pair used as reference (the other one would be BNB in most cases)
   * @param isCrystal sanity check for usage of crs token or dia
   * @returns price of the LP token
   */
  async getLPTokenPrice(lpToken: ERC20, token: ERC20, isCrystal: boolean): Promise<string> {
    const totalSupply = getFullDisplayBalance(await lpToken.totalSupply(), lpToken.decimal);
    //Get amount of tokenA
    const tokenSupply = getFullDisplayBalance(await token.balanceOf(lpToken.address), token.decimal);
    const stat = isCrystal === true ? await this.getCrystalStat() : await this.getShareStat();
    const priceOfToken = stat.priceInDollars;
    const tokenInLP = Number(tokenSupply) / Number(totalSupply);
    const tokenPrice = (Number(priceOfToken) * tokenInLP * 2) //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total
      .toString();
    return tokenPrice;
  }

  /**
   * Calculates the price of an LP token
   * Reference https://github.com/DefiDebauchery/discordpricebot/blob/4da3cdb57016df108ad2d0bb0c91cd8dd5f9d834/pricebot/pricebot.py#L150
   * @param lpToken the token under calculation
   * @param token the token pair used as reference (the other one would be BNB in most cases)
   * @param isCrystal sanity check for usage of crs token or dia
   * @returns price of the LP token
   */
  async getExtraLPTokenPrice(lpToken: ERC20, token: ERC20, isWETH: boolean): Promise<string> {
    const totalSupply = getFullDisplayBalance(await lpToken.totalSupply(), lpToken.decimal);
    //Get amount of tokenA
    const tokenSupply = getFullDisplayBalance(await token.balanceOf(lpToken.address), token.decimal);

    const priceOfToken = isWETH ? (await this.getWBNBPriceInBUSD()) : 1;
    const tokenInLP = Number(tokenSupply) / Number(totalSupply);
    const tokenPrice = (Number(priceOfToken) * tokenInLP * 2) //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total
      .toString();
    return tokenPrice;
  }

  async earnedFromBank(
    poolName: ContractName,
    earnTokenName: String,
    poolId: Number,
    account = this.myAccount,
  ): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      if (earnTokenName === 'CRS') {
        return await pool.pendingCRS(poolId, account);
      } else {
        return await pool.pendingShare(poolId, account);
      }
    } catch (err) {
      console.error(`Failed to call pendingShare() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(poolName: ContractName, poolId: Number, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      let userInfo = await pool.userInfo(poolId, account);
      return await userInfo.amount;
    } catch (err) {
      console.error(`Failed to call userInfo() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(poolName: ContractName, poolId: Number, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    return await pool.deposit(poolId, amount);
  }

  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(poolName: ContractName, poolId: Number, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    return await pool.withdraw(poolId, amount);
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName, poolId: Number): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    //By passing 0 as the amount, we are asking the contract to only redeem the reward and not the currently staked token
    return await pool.withdraw(poolId, 0);
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(poolName: ContractName, poolId: Number, account = this.myAccount): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    let userInfo = await pool.userInfo(poolId, account);
    return await pool.withdraw(poolId, userInfo.amount);
  }

  async fetchBoardroomVersionOfUser(): Promise<string> {
    return 'latest';
  }

  currentBoardroom(): Contract {
    if (!this.boardroomVersionOfUser) {
      //throw new Error('you must unlock the wallet to continue.');
    }
    return this.contracts.Boardroom;
  }

  isOldBoardroomMember(): boolean {
    return this.boardroomVersionOfUser !== 'latest';
  }

  async getTokenPriceFromPancakeswap(tokenContract: ERC20): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    //const { chainId } = this.config;
    const { WBNB } = this.config.externalTokens;

    const wftm = new Token(config.chainId, WBNB[0], WBNB[1], 'WBNB');
    const token = new Token(config.chainId, tokenContract.address, tokenContract.decimal, tokenContract.symbol);
    try {
      const wftmToToken = await Fetcher.fetchPairData(wftm, token, this.provider);
      const priceInBUSD = new Route([wftmToToken], token);
      return priceInBUSD.midPrice.toFixed(4);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  // async getTokenPriceFromPancakeswapBUSD(tokenContract: ERC20): Promise<string> {
  //   const ready = await this.provider.ready;
  //   if (!ready) return;
  //   const busd = new Token(config.chainId, this.BUSD.address, this.BUSD.decimal, 'BUSD', 'BUSD Token');
  //   const token = new Token(config.chainId, tokenContract.address, tokenContract.decimal, tokenContract.symbol);
  //   try {
  //     const crs_busd_pair = await Fetcher.fetchPairData(busd, token, this.provider);
  //     const priceInBUSD = new Route([crs_busd_pair], token);

  //     const priceForPeg = Number(priceInBUSD.midPrice.toFixed(12));
  //     return priceForPeg.toFixed(4);
  //   } catch (err) {
  //     console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
  //   }
  // }

  // async getWBNBPriceFromPancakeswap(): Promise<string> {
  //   const ready = await this.provider.ready;
  //   if (!ready) return;
  //   const { WBNB, BUSD } = this.externalTokens;
  //   try {
  //     const busd_wbnb_lp_pair = this.externalTokens['BUSD/BNB'];
  //     let bnb_amount_BN = await WBNB.balanceOf(busd_wbnb_lp_pair.address);
  //     let bnb_amount = Number(getFullDisplayBalance(bnb_amount_BN, WBNB.decimal));
  //     let busd_amount_BN = await BUSD.balanceOf(busd_wbnb_lp_pair.address);
  //     let busd_amount = Number(getFullDisplayBalance(busd_amount_BN, BUSD.decimal));
  //     return (busd_amount / bnb_amount).toString();
  //   } catch (err) {
  //     console.error(`Failed to fetch token price of WBNB: ${err}`);
  //   }
  // }

  // async getBUSDPriceFromPancakeswap(): Promise<string> {
  //   const ready = await this.provider.ready;
  //   if (!ready) return;
  //   const { BUSD } = this.externalTokens;
  //   try {
  //     const btcPriceInBNB = await this.getTokenPriceFromPancakeswap(BUSD);
  //     const wbnbPrice = await this.getWBNBPriceFromPancakeswap();

  //     const btcprice = (Number(btcPriceInBNB) * Number(wbnbPrice)).toFixed(2).toString();
  //     return btcprice;
  //   } catch (err) {
  //     console.error(`Failed to fetch token price of BUSD: ${err}`);
  //   }
  // }

  async getTokenPriceInBUSD(tokenContract: ERC20, lpContract: ERC20): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { BUSD } = this.externalTokens;
    try {
      let tokenAmountS = await tokenContract.balanceOf(lpContract.address);
      let tokenAmount = Number(getFullDisplayBalance(tokenAmountS, tokenContract.decimal));
      let nativeAmountS = await BUSD.balanceOf(lpContract.address);
      let nativeAmount = Number(getFullDisplayBalance(nativeAmountS, BUSD.decimal));
      return (nativeAmount / tokenAmount).toString();
    } catch (err) {
      console.error(`Failed to fetch token price of WFTM1: ${err}`);
    }
  }

  async getWBNBPriceInBUSD(): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { WBNB, BUSD } = this.externalTokens;
    try {
      const busd_wbnb_lp_pair = this.externalTokens['BUSD/BNB'];
      let bnb_amount_BN = await WBNB.balanceOf(busd_wbnb_lp_pair.address);
      let bnb_amount = Number(getFullDisplayBalance(bnb_amount_BN, WBNB.decimal));
      let busd_amount_BN = await BUSD.balanceOf(busd_wbnb_lp_pair.address);
      let busd_amount = Number(getFullDisplayBalance(busd_amount_BN, BUSD.decimal));
      return (busd_amount / bnb_amount).toString();
    } catch (err) {
      console.error(`Failed to fetch token price of WBNB: ${err}`);
    }
  }

  //===================================================================
  //===================================================================
  //===================== MASONRY METHODS =============================
  //===================================================================
  //===================================================================

  async getBoardroomAPR() {
    const Boardroom = this.currentBoardroom();
    const latestSnapshotIndex = await Boardroom.latestSnapshotIndex();
    const lastHistory = await Boardroom.arkHistory(latestSnapshotIndex);

    const lastRewardsReceived = lastHistory[1];

    const DIAPrice = (await this.getShareStat()).priceInDollars;
    const CRSPrice = (await this.getCrystalStat()).priceInDollars;
    const epochRewardsPerShare = lastRewardsReceived / 1e18;

    //Mgod formula
    const amountOfRewardsPerDay = epochRewardsPerShare * Number(CRSPrice) * 4;
    const boardroomDIABalanceOf = await this.DIA.balanceOf(Boardroom.address);
    const boardroomTVL = Number(getDisplayBalance(boardroomDIABalanceOf, this.DIA.decimal)) * Number(DIAPrice);
    const realAPR = ((amountOfRewardsPerDay * 100) / boardroomTVL) * 365;
    return realAPR;
  }

  /**
   * Checks if the user is allowed to retrieve their reward from the Boardroom
   * @returns true if user can withdraw reward, false if they can't
   */
  async canUserClaimRewardFromBoardroom(): Promise<boolean> {
    if (this.myAccount === undefined) return;
    const Boardroom = this.currentBoardroom();
    return await Boardroom.canClaimReward(this.myAccount);
  }

  /**
   * Checks if the user is allowed to retrieve their reward from the Boardroom
   * @returns true if user can withdraw reward, false if they can't
   */
  async canUserUnstakeFromBoardroom(): Promise<boolean> {
    if (this.myAccount === undefined) return;
    const Boardroom = this.currentBoardroom();
    const canWithdraw = await Boardroom.canWithdraw(this.myAccount);
    const stakedAmount = await this.getStakedSharesOnBoardroom();
    const notStaked = Number(getDisplayBalance(stakedAmount, this.DIA.decimal)) === 0;
    const result = notStaked ? false : canWithdraw;
    return result;
  }

  async timeUntilClaimRewardFromBoardroom(): Promise<BigNumber> {
    // const Boardroom = this.currentBoardroom();
    // const mason = await Boardroom.masons(this.myAccount);
    return BigNumber.from(0);
  }

  async getTotalStakedInBoardroom(): Promise<BigNumber> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.totalSupply();
  }

  async stakeShareToBoardroom(amount: string): Promise<TransactionResponse> {
    if (this.isOldBoardroomMember()) {
      throw new Error("you're using old boardroom. please withdraw and deposit the DIA again.");
    }
    const Boardroom = this.currentBoardroom();
    return await Boardroom.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnBoardroom(): Promise<BigNumber> {
    if (this.myAccount === undefined) return;
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getShareOf(this.myAccount);
    }
    return await Boardroom.balanceOf(this.myAccount);
  }

  async getEarningsOnBoardroom(): Promise<BigNumber> {
    if (this.myAccount === undefined) return;
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getCashEarningsOf(this.myAccount);
    }
    return await Boardroom.earned(this.myAccount);
  }

  async withdrawShareFromBoardroom(amount: string): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.withdraw(decimalToBalance(amount));
  }

  async harvestCashFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.claimDividends();
    }
    return await Boardroom.claimReward();
  }

  async exitFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.exit();
  }

  async getGpoolTimes(): Promise<AllocationTime> {
    const { CrystalGenesisRewardPool } = this.contracts;
    const start: BigNumber = await CrystalGenesisRewardPool.poolStartTime();
    const end: BigNumber = await CrystalGenesisRewardPool.poolEndTime();
    const startAllocation = new Date(start.mul(1000).toNumber());
    const endAllocation = new Date(end.mul(1000).toNumber());

    return { from: startAllocation, to: endAllocation };
  }

  async getTreasuryNextAllocationTime(): Promise<AllocationTime> {
    const { Treasury } = this.contracts;
    const nextEpochTimestamp: BigNumber = await Treasury.nextEpochPoint();
    const nextAllocation = new Date(nextEpochTimestamp.mul(1000).toNumber());
    const prevAllocation = new Date(Date.now());

    return { from: prevAllocation, to: nextAllocation };
  }
  /**
   * This method calculates and returns in a from to to format
   * the period the user needs to wait before being allowed to claim
   * their reward from the boardroom
   * @returns Promise<AllocationTime>
   */
  async getUserClaimRewardTime(): Promise<AllocationTime> {
    const fromDate = new Date(Date.now());
    if (this.myAccount === undefined) {
      return { from: fromDate, to: fromDate };
    }

    const { Boardroom, Treasury } = this.contracts;
    const nextEpochTimestamp = await Boardroom.nextEpochPoint(); //in unix timestamp
    const currentEpoch = await Boardroom.epoch();
    const ark = await Boardroom.members(this.myAccount);
    const startTimeEpoch = ark.epochTimerStart;
    const period = await Treasury.EPOCH_DURATION();
    const periodInHours = period / 60 / 60; // 6 hours, period is displayed in seconds which is 21600
    const rewardLockupEpochs = await Boardroom.rewardLockupEpochs();
    const targetEpochForClaimUnlock = Number(startTimeEpoch) + Number(rewardLockupEpochs);
    const stakedAmount = await this.getStakedSharesOnBoardroom();

    if (currentEpoch <= targetEpochForClaimUnlock && Number(stakedAmount) === 0) {
      return { from: fromDate, to: fromDate };
    } else if (targetEpochForClaimUnlock - currentEpoch === 1) {
      const toDate = new Date(nextEpochTimestamp * 1000);
      return { from: fromDate, to: toDate };
    } else {
      const toDate = new Date(nextEpochTimestamp * 1000);
      const delta = targetEpochForClaimUnlock - currentEpoch - 1;
      const endDate = moment(toDate)
        .add(delta * periodInHours, 'hours')
        .toDate();
      return { from: fromDate, to: endDate };
    }
  }

  /**
   * This method calculates and returns in a from to to format
   * the period the user needs to wait before being allowed to unstake
   * from the boardroom
   * @returns Promise<AllocationTime>
   */
  async getUserUnstakeTime(): Promise<AllocationTime> {
    const fromDate = new Date(Date.now());
    if (this.myAccount === undefined) {
      return { from: fromDate, to: fromDate };
    }

    const { Boardroom, Treasury } = this.contracts;
    const nextEpochTimestamp = await Boardroom.nextEpochPoint();
    const currentEpoch = await Boardroom.epoch();
    const ark = await Boardroom.members(this.myAccount);
    const startTimeEpoch = ark.epochTimerStart;
    const period = await Treasury.EPOCH_DURATION();
    const PeriodInHours = period / 60 / 60;
    const withdrawLockupEpochs = await Boardroom.withdrawLockupEpochs();
    const targetEpochForClaimUnlock = Number(startTimeEpoch) + Number(withdrawLockupEpochs);
    const stakedAmount = await this.getStakedSharesOnBoardroom();
    
    if (currentEpoch <= targetEpochForClaimUnlock && Number(stakedAmount) === 0) {
      return { from: fromDate, to: fromDate };
    } else if (targetEpochForClaimUnlock - currentEpoch === 1) {
      const toDate = new Date(nextEpochTimestamp * 1000);
      return { from: fromDate, to: toDate };
    } else {
      const toDate = new Date(nextEpochTimestamp * 1000);
      const delta = targetEpochForClaimUnlock - Number(currentEpoch) - 1;
      const endDate = moment(toDate)
        .add(delta * PeriodInHours, 'hours')
        .toDate();
      return { from: fromDate, to: endDate };
    }
  }

  async watchAssetInMetamask(assetName: string): Promise<boolean> {
    const { ethereum } = window as any;
    if (ethereum && ethereum.networkVersion === config.chainId.toString()) {
      let asset;
      let assetUrl;
      if (assetName === 'CRS') {
        asset = this.CRS;
        assetUrl = 'https://raw.githubusercontent.com/levintech/synergy-assets/main/crystal_512x512.png';
      } else if (assetName === 'DIA') {
        asset = this.DIA;
        assetUrl = 'https://raw.githubusercontent.com/levintech/synergy-assets/main/diamond_512x512.png';
      } else if (assetName === 'BUSD') {
        asset = this.BUSD;
        assetUrl = 'https://bscscan.com/token/images/btcb_32.png';
      }
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: asset.address,
            symbol: asset.symbol,
            decimals: 18,
            image: assetUrl,
          },
        },
      });
    }
    return true;
  }

  async provideCrystalBusdLP(busdAmount: string, crsAmount: BigNumber): Promise<TransactionResponse> {
    const { TaxOffice } = this.contracts;
    let overrides = {
      value: parseUnits(busdAmount, 18),
    };
    return await TaxOffice.addLiquidityETHTaxFree(
      crsAmount,
      crsAmount.mul(992).div(1000),
      parseUnits(busdAmount, 18).mul(992).div(1000),
      overrides,
    );
  }

  async estimateZapIn(tokenName: string, lpName: string, amount: string): Promise<number[]> {
    const { zapper } = this.contracts;
    const lpToken = this.externalTokens[lpName];
    let estimate;
    if (tokenName === BNB_TICKER) {
      estimate = await zapper.estimateZapIn(lpToken.address, SPOOKY_ROUTER_ADDR, parseUnits(amount, 18));
    } else {
      const token = this.externalTokens[tokenName];
      estimate = await zapper.estimateZapInToken(
        token.address,
        lpToken.address,
        SPOOKY_ROUTER_ADDR,
        parseUnits(amount, 18),
      );
    }
    return [estimate[0] / 1e18, estimate[1] / 1e18];
  }

  async zapIn(tokenName: string, lpName: string, amount: string): Promise<TransactionResponse> {
    const { zapper } = this.contracts;
    const lpToken = this.externalTokens[lpName];
    if (tokenName === BNB_TICKER) {
      let overrides = {
        value: parseUnits(amount, 18),
      };
      return await zapper.zapIn(lpToken.address, SPOOKY_ROUTER_ADDR, this.myAccount, overrides);
    } else {
      const token = this.externalTokens[tokenName];
      return await zapper.zapInToken(
        token.address,
        parseUnits(amount, 18),
        lpToken.address,
        SPOOKY_ROUTER_ADDR,
        this.myAccount,
      );
    }
  }
}
