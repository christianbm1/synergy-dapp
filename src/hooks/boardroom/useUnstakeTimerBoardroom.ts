import {useEffect, useState} from 'react';
import usePushFinance from '../usePushFinance';
import {AllocationTime} from '../../push-finance/types';

const useUnstakeTimerBoardroom = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const pushFinance = usePushFinance();

  useEffect(() => {
    if (pushFinance) {
      pushFinance.getUserUnstakeTime().then(setTime);
    }
  }, [pushFinance]);
  return time;
};

export default useUnstakeTimerBoardroom;
