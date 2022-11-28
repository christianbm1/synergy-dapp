import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        pushFinance.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} PSHARE from the boardroom`,
      );
    },
    [pushFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromBoardroom;
