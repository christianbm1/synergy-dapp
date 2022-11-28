import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import {Bank} from '../push-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        pushFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, pushFinance, handleTransactionReceipt],
  );
  return {onZap: handleZap};
};

export default useZap;
