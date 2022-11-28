import {useCallback, useEffect, useState} from 'react';
import usePushFinance from '../usePushFinance';
import {useWallet} from 'use-wallet';
import {BigNumber} from 'ethers';
import {parseUnits} from 'ethers/lib/utils';

const useEstimatePShare = (pbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const {account} = useWallet();
  const pushFinance = usePushFinance();

  const estimateAmountOfPShare = useCallback(async () => {
    const pbondAmountBn = parseUnits(pbondAmount);
    const amount = await pushFinance.estimateAmountOfPShare(pbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfPShare().catch((err) => console.error(`Failed to get estimateAmountOfPShare: ${err.stack}`));
    }
  }, [account, estimateAmountOfPShare]);

  return estimateAmount;
};

export default useEstimatePShare;
