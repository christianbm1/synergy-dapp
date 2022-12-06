import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        synergyFinance.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} DIA from the boardroom`,
      );
    },
    [synergyFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromBoardroom;
