import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await synergyFinance.getTotalValueLocked());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, synergyFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
