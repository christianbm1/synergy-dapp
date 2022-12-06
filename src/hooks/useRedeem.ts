import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {Bank} from '../synergy-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(synergyFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, synergyFinance, handleTransactionReceipt]);

  return {onRedeem: handleRedeem};
};

export default useRedeem;
