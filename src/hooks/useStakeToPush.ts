import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToPush = () => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(pushFinance.stakeToPush(amount), `Stake ${amount} PUSH for xPUSH`);
    },
    [pushFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStakeToPush;
