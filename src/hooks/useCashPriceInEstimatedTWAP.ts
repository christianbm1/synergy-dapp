import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {TokenStat} from '../synergy-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const synergyFinance = useSynergyFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await synergyFinance.getCRSStatInEstimatedTWAP());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, synergyFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
