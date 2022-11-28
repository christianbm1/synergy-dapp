import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import {AllocationTime} from '../push-finance/types';
import useRefresh from './useRefresh';

const useTreasuryAllocationTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const pushFinance = usePushFinance();
  useEffect(() => {
    if (pushFinance) {
      pushFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [pushFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
