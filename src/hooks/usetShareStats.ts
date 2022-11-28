import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import {TokenStat} from '../push-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const pushFinance = usePushFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await pushFinance.getShareStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, pushFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
