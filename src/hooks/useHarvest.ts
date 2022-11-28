import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {Bank} from '../push-finance';

const useHarvest = (bank: Bank) => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      pushFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, pushFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;
