import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(synergyFinance.harvestCashFromBoardroom(), 'Claim CRS from Boardroom');
  }, [synergyFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvestFromBoardroom;
