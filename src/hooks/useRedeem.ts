import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import {Bank} from '../push-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(pushFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, pushFinance, handleTransactionReceipt]);

  return {onRedeem: handleRedeem};
};

export default useRedeem;
