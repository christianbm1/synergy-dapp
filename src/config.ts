import { Configuration } from './synergy-finance/config';
import { BankInfo } from './synergy-finance';

const configurations: { [env: string]: Configuration } = {
  test: {
    chainId: 97,
    networkName: 'BSC Testnet',
    bscscanUrl: 'https://testnet.bscscan.com',
    defaultProvider: 'https://bsc-testnet.public.blastapi.io',
    deployments: require('./synergy-finance/deployments/deployments.testnet.json'),
    externalTokens: {
      WBNB: ['0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 18],
      BUSD: ['0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7', 18],
      DAI: ['0x8a9424745056Eb399FD19a0EC26A14316684e274', 18],
      USDT: ['0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684', 18],
      'BUSD/BNB': ['0xe0e92035077c39594793e61802a350347c320cf2', 18],
      'CRS/BUSD': ['0x0Ab537936293d7ec30C86DBeDC01D6924d5325a2', 18],
      'CRS/BNB': ['0x7A1166B75D5573Ff220E5172136b69403D1afc7c', 18],
      'DIA/BUSD': ['0x2F89f743D64c637b8504312a140Cb955c78641Ba', 18],
      'DIA/BNB': ['0x3c27447738efCC412C74907f4832064EDe74fDbb', 18],
      'CRS/USDT': ['0xD1337F8a7d7E78aeDf709495CbA6C5E91E59cbD1', 18],
    },
    refreshInterval: 10000,
  },
  development: {
    chainId: 56,
    networkName: 'BSC Mainnet',
    bscscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./synergy-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      BTCB: ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18],
      EMP: ['0x3b248CEfA87F836a4e6f6d6c9b42991b88Dc1d58', 18],
      DIBS: ['0xFd81Ef21EA7CF1dC00e9c6Dd261B4F3BE0341d5c', 18],
      PAPER: ['0xE239b561369aeF79eD55DFdDed84848A3bF60480', 18],
      'BUSD/BNB': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
      'USDT/BTCB': ['0x3f803ec2b816ea7f06ec76aa2b6f2532f9892d62', 18],
      'CRYSTAL/BTCB': ['0x593E9b3E1955e7Ab0C93Bf9b07478b7F6E5e8550', 18],
      'CRYSTAL/DIAMOND': ['0xB45CaC7809442e6280Ff485142B465D174d4eEcd', 18],
      'DIA/BNB': ['0xde0ABcFB728e00ABDE52B3288B7e23aB4c49fBAf', 18],
    },
    refreshInterval: 10000,
  },
  production: {
    chainId: 56,
    networkName: 'BSC Mainnet',
    bscscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./synergy-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      BTCB: ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18],
      EMP: ['0x3b248CEfA87F836a4e6f6d6c9b42991b88Dc1d58', 18],
      DIBS: ['0xFd81Ef21EA7CF1dC00e9c6Dd261B4F3BE0341d5c', 18],
      PAPER: ['0xE239b561369aeF79eD55DFdDed84848A3bF60480', 18],
      'BUSD/BNB': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
      'USDT/BTCB': ['0x3f803ec2b816ea7f06ec76aa2b6f2532f9892d62', 18],
      'CRYSTAL/BTCB': ['0x593E9b3E1955e7Ab0C93Bf9b07478b7F6E5e8550', 18],
      'CRYSTAL/DIAMOND': ['0xB45CaC7809442e6280Ff485142B465D174d4eEcd', 18],
      'DIA/BNB': ['0xde0ABcFB728e00ABDE52B3288B7e23aB4c49fBAf', 18],
    },
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Genesis Pools
        - 1 = Primary Farms rewarding DIA
        - 2 = Partner token LP Farms rewarding DIA
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  CrystalBUSDGenesisRewardPool: {
    name: 'Earn CRS by BUSD',
    poolId: 0,
    sectionInUI: 0,
    contract: 'CrystalBUSDGenesisRewardPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'CRS',
    finished: false,
    sort: 0,
    closedForStaking: false,
  },
  CrystalWBNBGenesisRewardPool: {
    name: 'Earn CRS by WBNB',
    poolId: 1,
    sectionInUI: 0,
    contract: 'CrystalWBNBGenesisRewardPool',
    depositTokenName: 'WBNB',
    earnTokenName: 'CRS',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  CrystalDAIGenesisRewardPool: {
    name: 'Earn CRS by DAI',
    poolId: 2,
    sectionInUI: 0,
    contract: 'CrystalDAIGenesisRewardPool',
    depositTokenName: 'DAI',
    earnTokenName: 'CRS',
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
  CrystalBusdLPDiamondRewardPool: {
    name: 'Earn DIA by CRS/BUSD LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'CrystalBusdLPDiamondRewardPool',
    depositTokenName: 'CRS/BUSD',
    earnTokenName: 'DIA',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  CrystalBnbLPDiamondRewardPool: {
    name: 'Earn DIA by CRS/BNB LP',
    poolId: 1,
    sectionInUI: 1,
    contract: 'CrystalBnbLPDiamondRewardPool',
    depositTokenName: 'CRS/BNB',
    earnTokenName: 'DIA',
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
  DiamondBusdLPDiamondRewardPool: {
    name: 'Earn DIA by DIA/BUSD LP',
    poolId: 2,
    sectionInUI: 1,
    contract: 'DiamondBusdLPDiamondRewardPool',
    depositTokenName: 'DIA/BUSD',
    earnTokenName: 'DIA',
    finished: false,
    sort: 3,
    closedForStaking: false,
  },
  DiamondBnbLPDiamondRewardPool: {
    name: 'Earn DIA by DIA/BNBD LP',
    poolId: 3,
    sectionInUI: 1,
    contract: 'DiamondBnbLPDiamondRewardPool',
    depositTokenName: 'DIA/BNB',
    earnTokenName: 'DIA',
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
  CrystalUsdtLPDiamondRewardPool: {
    name: 'Earn DIA by CRS/USDT LP',
    poolId: 4,
    sectionInUI: 2,
    contract: 'CrystalUsdtLPDiamondRewardPool',
    depositTokenName: 'CRS/USDT',
    earnTokenName: 'DIA',
    finished: false,
    sort: 5,
    closedForStaking: false,
  },
};

export default configurations['test'];
