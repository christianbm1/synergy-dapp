import {useCallback} from 'react';
import usePushFinance from './usePushFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import {TAX_OFFICE_ADDR} from '../utils/constants';

const useProvidePushFtmLP = () => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvidePushFtmLP = useCallback(
    (ftmAmount: string, pushAmount: string) => {
      const pushAmountBn = parseUnits(pushAmount);
      handleTransactionReceipt(
        pushFinance.providePushFtmLP(ftmAmount, pushAmountBn),
        `Provide PUSH-BTCB LP ${pushAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [pushFinance, handleTransactionReceipt],
  );
  return {onProvidePushFtmLP: handleProvidePushFtmLP};
};

export default useProvidePushFtmLP;
