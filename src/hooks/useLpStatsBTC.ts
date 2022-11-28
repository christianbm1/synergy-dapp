import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import {LPStat} from '../push-finance/types';
import useRefresh from './useRefresh';

const useLpStatsBTC = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const pushFinance = usePushFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await pushFinance.getLPStatBTC(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, pushFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStatsBTC;
