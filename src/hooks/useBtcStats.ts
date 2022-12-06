import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useRefresh from './useRefresh';

const useBtcStats = () => {
  const [stat, setStat] = useState<Number>();
  const {slowRefresh} = useRefresh();
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await synergyFinance.getBTCPriceUSD());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, synergyFinance, slowRefresh]);

  return stat;
};

export default useBtcStats;
