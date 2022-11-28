import { Configuration } from './push-finance/config';
import { BankInfo } from './push-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 56,
    networkName: 'BSC Mainnet',
    ftmscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./push-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      BTCB: ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18],
      EMP: ['0x3b248cefa87f836a4e6f6d6c9b42991b88dc1d58', 18],
      DIBS: ['0xFd81Ef21EA7CF1dC00e9c6Dd261B4F3BE0341d5c', 18],
      PAPER: ['0xE239b561369aeF79eD55DFdDed84848A3bF60480', 18],
      'USDT-BNB-LP': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
      'USDT-BTCB-LP': ['0x3f803ec2b816ea7f06ec76aa2b6f2532f9892d62', 18],
      'PUSH-BTCB-LP': ['0x593E9b3E1955e7Ab0C93Bf9b07478b7F6E5e8550', 18],
      'PUSH-PSHARE-LP': ['0xB45CaC7809442e6280Ff485142B465D174d4eEcd', 18],
      'PSHARE-BNB-LP': ['0xde0ABcFB728e00ABDE52B3288B7e23aB4c49fBAf', 18],
    },
    baseLaunchDate: new Date('2021-11-20 1:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-11-20T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: 56,
    networkName: 'BSC Mainnet',
    ftmscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./push-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      BTCB: ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18],
      EMP: ['0x3b248cefa87f836a4e6f6d6c9b42991b88dc1d58', 18],
      DIBS: ['0xFd81Ef21EA7CF1dC00e9c6Dd261B4F3BE0341d5c', 18],
      PAPER: ['0xE239b561369aeF79eD55DFdDed84848A3bF60480', 18],
      'USDT-BNB-LP': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
      'USDT-BTCB-LP': ['0x3f803ec2b816ea7f06ec76aa2b6f2532f9892d62', 18],
      'PUSH-BTCB-LP': ['0x593E9b3E1955e7Ab0C93Bf9b07478b7F6E5e8550', 18],
      'PUSH-PSHARE-LP': ['0xB45CaC7809442e6280Ff485142B465D174d4eEcd', 18],
      'PSHARE-BNB-LP': ['0xde0ABcFB728e00ABDE52B3288B7e23aB4c49fBAf', 18],
    },
    baseLaunchDate: new Date('2021-11-20 1:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-11-20T00:00:00Z'),
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
        - 1 = LP asset staking rewarding PUSH
        - 2 = LP asset staking rewarding PSHARE
        - 3 = Single asset staking rewarding PSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  PushBTCBGenesisRewardPool: {
    name: 'Earn PUSH by BTCB',
    poolId: 0,
    sectionInUI: 0,
    contract: 'PushBTCBGenesisRewardPool',
    depositTokenName: 'BTCB',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 0,
    closedForStaking: false,
  },
  PushWBNBGenesisRewardPool: {
    name: 'Earn PUSH by WBNB',
    poolId: 1,
    sectionInUI: 0,
    contract: 'PushWBNBGenesisRewardPool',
    depositTokenName: 'WBNB',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  PushBUSDGenesisRewardPool: {
    name: 'Earn PUSH by BUSD',
    poolId: 2,
    sectionInUI: 0,
    contract: 'PushBUSDGenesisRewardPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  PushEMPGenesisRewardPool: {
    name: 'Earn PUSH by EMP',
    poolId: 3,
    sectionInUI: 0,
    contract: 'PushEMPGenesisRewardPool',
    depositTokenName: 'EMP',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 3,
    closedForStaking: false,
  },
  PushDIBSGenesisRewardPool: {
    name: 'Earn PUSH by DIBS',
    poolId: 4,
    sectionInUI: 0,
    contract: 'PushDIBSGenesisRewardPool',
    depositTokenName: 'DIBS',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
  PushPAPERGenesisRewardPool: {
    name: 'Earn PUSH by PAPER',
    poolId: 5,
    sectionInUI: 0,
    contract: 'PushPAPERGenesisRewardPool',
    depositTokenName: 'PAPER',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
  PushBTCBLPPushRewardPool: {
    name: 'Earn PUSH by PUSH-BTCB LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'PushBTCBLPPushRewardPool',
    depositTokenName: 'PUSH-BTCB-LP',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 0,
    closedForStaking: false,
  },
  PShareBnbLPPushRewardPool: {
    name: 'Earn PUSH by PSHARE-BNB LP',
    poolId: 1,
    sectionInUI: 1,
    contract: 'PShareBnbLPPushRewardPool',
    depositTokenName: 'PSHARE-BNB-LP',
    earnTokenName: 'PUSH',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  PushBtcbLPPShareRewardPool: {
    name: 'Earn PSHARE by PUSH-BTCB LP',
    poolId: 0,
    sectionInUI: 3,
    contract: 'PushBtcbLPPShareRewardPool',
    depositTokenName: 'PUSH-BTCB-LP',
    earnTokenName: 'PSHARE',
    finished: false,
    sort: 0,
    closedForStaking: false,
  },
  PShareBnbLPPShareRewardPool: {
    name: 'Earn PSHARE by PSHARE-WBNB LP',
    poolId: 1,
    sectionInUI: 3,
    contract: 'PShareBnbLPPShareRewardPool',
    depositTokenName: 'PSHARE-BNB-LP',
    earnTokenName: 'PSHARE',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  PushPshareLPPShareRewardPool: {
    name: 'Earn PSHARE by PUSH-PSHARE LP',
    poolId: 2,
    sectionInUI: 3,
    contract: 'PushPshareLPPShareRewardPool',
    depositTokenName: 'PUSH-PSHARE-LP',
    earnTokenName: 'PSHARE',
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
