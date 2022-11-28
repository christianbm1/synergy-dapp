import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(pushFinance.harvestCashFromBoardroom(), 'Claim PUSH from Boardroom');
  }, [pushFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvestFromBoardroom;
