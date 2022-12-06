import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {LPStat} from '../synergy-finance/types';
import useRefresh from './useRefresh';

const useLpStatsBTC = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await synergyFinance.getLPStatBTC(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, synergyFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStatsBTC;
