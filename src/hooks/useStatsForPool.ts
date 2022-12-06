import {useCallback, useState, useEffect} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {Bank} from '../synergy-finance';
import {PoolStats} from '../synergy-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const synergyFinance = useSynergyFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await synergyFinance.getPoolAPRs(bank));
  }, [synergyFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, synergyFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;
