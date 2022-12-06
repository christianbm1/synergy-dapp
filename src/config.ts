import { Configuration } from './synergy-finance/config';
import { BankInfo } from './synergy-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 56,
    networkName: 'BSC Mainnet',
    ftmscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./synergy-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      BTCB: ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18],
      EMP: ['0x3b248cefa87f836a4e6f6d6c9b42991b88dc1d58', 18],
      DIBS: ['0xFd81Ef21EA7CF1dC00e9c6Dd261B4F3BE0341d5c', 18],
      PAPER: ['0xE239b561369aeF79eD55DFdDed84848A3bF60480', 18],
      'USDT-BNB-LP': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
      'USDT-BTCB-LP': ['0x3f803ec2b816ea7f06ec76aa2b6f2532f9892d62', 18],
      'CRS-BTCB-LP': ['0x593E9b3E1955e7Ab0C93Bf9b07478b7F6E5e8550', 18],
      'CRS-DIA-LP': ['0xB45CaC7809442e6280Ff485142B465D174d4eEcd', 18],
      'DIA-BNB-LP': ['0xde0ABcFB728e00ABDE52B3288B7e23aB4c49fBAf', 18],
    },
    refreshInterval: 10000,
  },
  production: {
    chainId: 56,
    networkName: 'BSC Mainnet',
    ftmscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./synergy-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      BTCB: ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18],
      EMP: ['0x3b248cefa87f836a4e6f6d6c9b42991b88dc1d58', 18],
      DIBS: ['0xFd81Ef21EA7CF1dC00e9c6Dd261B4F3BE0341d5c', 18],
      PAPER: ['0xE239b561369aeF79eD55DFdDed84848A3bF60480', 18],
      'USDT-BNB-LP': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
      'USDT-BTCB-LP': ['0x3f803ec2b816ea7f06ec76aa2b6f2532f9892d62', 18],
      'CRS-BTCB-LP': ['0x593E9b3E1955e7Ab0C93Bf9b07478b7F6E5e8550', 18],
      'CRS-DIA-LP': ['0xB45CaC7809442e6280Ff485142B465D174d4eEcd', 18],
      'DIA-BNB-LP': ['0xde0ABcFB728e00ABDE52B3288B7e23aB4c49fBAf', 18],
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
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding CRS
        - 2 = LP asset staking rewarding DIA
        - 3 = Single asset staking rewarding DIA
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  CrystalBTCBGenesisRewardPool: {
    name: 'Earn CRS by BTCB',
    poolId: 0,
    sectionInUI: 0,
    contract: 'CrystalBTCBGenesisRewardPool',
    depositTokenName: 'BTCB',
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
  CrystalBUSDGenesisRewardPool: {
    name: 'Earn CRS by BUSD',
    poolId: 2,
    sectionInUI: 0,
    contract: 'CrystalBUSDGenesisRewardPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'CRS',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  CrystalEMPGenesisRewardPool: {
    name: 'Earn CRS by EMP',
    poolId: 3,
    sectionInUI: 0,
    contract: 'CrystalEMPGenesisRewardPool',
    depositTokenName: 'EMP',
    earnTokenName: 'CRS',
    finished: false,
    sort: 3,
    closedForStaking: false,
  },
  CrystalDIBSGenesisRewardPool: {
    name: 'Earn CRS by DIBS',
    poolId: 4,
    sectionInUI: 0,
    contract: 'CrystalDIBSGenesisRewardPool',
    depositTokenName: 'DIBS',
    earnTokenName: 'CRS',
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
  CrystalPAPERGenesisRewardPool: {
    name: 'Earn CRS by PAPER',
    poolId: 5,
    sectionInUI: 0,
    contract: 'CrystalPAPERGenesisRewardPool',
    depositTokenName: 'PAPER',
    earnTokenName: 'CRS',
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
  CrystalBTCBLPCrystalRewardPool: {
    name: 'Earn CRS by CRS-BTCB LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'CrystalBTCBLPCrystalRewardPool',
    depositTokenName: 'CRS-BTCB-LP',
    earnTokenName: 'CRS',
    finished: false,
    sort: 0,
    closedForStaking: false,
  },
  DiamondBnbLPCrystalRewardPool: {
    name: 'Earn CRS by DIA-BNB LP',
    poolId: 1,
    sectionInUI: 1,
    contract: 'DiamondBnbLPCrystalRewardPool',
    depositTokenName: 'DIA-BNB-LP',
    earnTokenName: 'CRS',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  CrystalBtcbLPDiamondRewardPool: {
    name: 'Earn DIA by CRS-BTCB LP',
    poolId: 0,
    sectionInUI: 3,
    contract: 'CrystalBtcbLPDiamondRewardPool',
    depositTokenName: 'CRS-BTCB-LP',
    earnTokenName: 'DIA',
    finished: false,
    sort: 0,
    closedForStaking: false,
  },
  DiamondBnbLPDiamondRewardPool: {
    name: 'Earn DIA by DIA-WBNB LP',
    poolId: 1,
    sectionInUI: 3,
    contract: 'DiamondBnbLPDiamondRewardPool',
    depositTokenName: 'DIA-BNB-LP',
    earnTokenName: 'DIA',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  CrystalDiamondLPDiamondRewardPool: {
    name: 'Earn DIA by CRS-DIA LP',
    poolId: 2,
    sectionInUI: 3,
    contract: 'CrystalDiamondLPDiamondRewardPool',
    depositTokenName: 'CRS-DIA-LP',
    earnTokenName: 'DIA',
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
