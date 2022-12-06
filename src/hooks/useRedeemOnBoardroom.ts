import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem DIA from Boardroom';
    handleTransactionReceipt(synergyFinance.exitFromBoardroom(), alertDesc);
  }, [synergyFinance, description, handleTransactionReceipt]);
  return {onRedeem: handleRedeem};
};

export default useRedeemOnBoardroom;
