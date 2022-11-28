import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import {PoolStats} from '../push-finance/types';

import useRefresh from './useRefresh';

const useXpushAPR = () => {
  const {slowRefresh} = useRefresh();
  const [pushAPR, setPushAPR] = useState<PoolStats>();

  const pushFinance = usePushFinance();
  const isUnlocked = pushFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setPushAPR(await pushFinance.getXpushAPR());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, pushFinance]);
  return pushAPR;
};

export default useXpushAPR;
