import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {Bank} from '../synergy-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        synergyFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, synergyFinance, handleTransactionReceipt],
  );
  return {onZap: handleZap};
};

export default useZap;
