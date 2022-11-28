import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import {TokenStat} from '../push-finance/types';
import useRefresh from './useRefresh';

const usePushStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const pushFinance = usePushFinance();

  useEffect(() => {
    async function fetchPushPrice() {
      try {
        setStat(await pushFinance.getPushStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchPushPrice();
  }, [setStat, pushFinance, fastRefresh]);

  return stat;
};

export default usePushStats;
