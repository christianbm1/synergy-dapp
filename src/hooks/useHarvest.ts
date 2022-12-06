import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {Bank} from '../synergy-finance';

const useHarvest = (bank: Bank) => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      synergyFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, synergyFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;
