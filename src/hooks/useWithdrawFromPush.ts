import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromPush = () => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(pushFinance.withdrawFromPush(amount), `Redeem ${amount} PUSH from xPUSH Staking`);
    },
    [pushFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromPush;
