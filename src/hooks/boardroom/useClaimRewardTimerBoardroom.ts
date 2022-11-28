import {useEffect, useState} from 'react';
import usePushFinance from '../usePushFinance';
import {AllocationTime} from '../../push-finance/types';

const useClaimRewardTimerBoardroom = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const pushFinance = usePushFinance();

  useEffect(() => {
    if (pushFinance) {
      pushFinance.getUserClaimRewardTime().then(setTime);
    }
  }, [pushFinance]);
  return time;
};

export default useClaimRewardTimerBoardroom;
