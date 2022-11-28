import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import {TokenStat} from '../push-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const pushFinance = usePushFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await pushFinance.getPushStatInEstimatedTWAP());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, pushFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
