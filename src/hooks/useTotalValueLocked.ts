import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const pushFinance = usePushFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await pushFinance.getTotalValueLocked());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, pushFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
