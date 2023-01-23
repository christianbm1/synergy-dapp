import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {AllocationTime} from '../synergy-finance/types';
import useRefresh from './useRefresh';

const useFarmTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const synergyFinance = useSynergyFinance();
  useEffect(() => {
    if (synergyFinance) {
      synergyFinance.getFarmTimes().then(setTime);
    }
  }, [synergyFinance, slowRefresh]);
  return time;
};

export default useFarmTimes;
