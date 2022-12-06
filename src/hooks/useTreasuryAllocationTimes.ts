import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {AllocationTime} from '../synergy-finance/types';
import useRefresh from './useRefresh';

const useTreasuryAllocationTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const synergyFinance = useSynergyFinance();
  useEffect(() => {
    if (synergyFinance) {
      synergyFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [synergyFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
