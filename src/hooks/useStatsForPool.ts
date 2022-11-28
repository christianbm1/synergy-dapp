import {useCallback, useState, useEffect} from 'react';
import usePushFinance from './usePushFinance';
import {Bank} from '../push-finance';
import {PoolStats} from '../push-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const pushFinance = usePushFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await pushFinance.getPoolAPRs(bank));
  }, [pushFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, pushFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;
