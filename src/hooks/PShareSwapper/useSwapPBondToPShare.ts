import {useCallback} from 'react';
import usePushFinance from '../usePushFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import {parseUnits} from 'ethers/lib/utils';

const useSwapPBondToPShare = () => {
  const pushFinance = usePushFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapPShare = useCallback(
    (pbondAmount: string) => {
      const pbondAmountBn = parseUnits(pbondAmount, 18);
      handleTransactionReceipt(pushFinance.swapPBondToPShare(pbondAmountBn), `Swap ${pbondAmount} PBond to PShare`);
    },
    [pushFinance, handleTransactionReceipt],
  );
  return {onSwapPShare: handleSwapPShare};
};

export default useSwapPBondToPShare;
