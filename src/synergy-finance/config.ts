import {Deployments} from './deployments';
import {ChainId} from '@pancakeswap/sdk';

export type Configuration = {
  chainId: ChainId;
  networkName: string;
  bscscanUrl: string;
  defaultProvider: string;
  deployments: Deployments;
  externalTokens: {[contractName: string]: [string, number]};
  config?: EthereumConfig;

  refreshInterval: number;
};

export type EthereumConfig = {
  testing: boolean;
  autoGasMultiplier: number;
  defaultConfirmations: number;
  defaultGas: string;
  defaultGasPrice: string;
  ethereumNodeTimeout: number;
};

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 3,
  defaultGas: '6000000',
  defaultGasPrice: '7000000000000',
  ethereumNodeTimeout: 10000,
};
