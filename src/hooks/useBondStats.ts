import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import {TokenStat} from '../push-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const pushFinance = usePushFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await pushFinance.getBondStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, pushFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
