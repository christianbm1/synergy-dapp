import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {AllocationTime} from '../synergy-finance/types';
import useRefresh from './useRefresh';

const useGPoolTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const synergyFinance = useSynergyFinance();
  useEffect(() => {
    if (synergyFinance) {
      synergyFinance.getGpoolTimes().then(setTime);
    }
  }, [synergyFinance, slowRefresh]);
  return time;
};

export default useGPoolTimes;
