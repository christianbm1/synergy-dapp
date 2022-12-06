import {useEffect, useState} from 'react';
import useSynergyFinance from '../useSynergyFinance';
import {AllocationTime} from '../../synergy-finance/types';

const useClaimRewardTimerBoardroom = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    if (synergyFinance) {
      synergyFinance.getUserClaimRewardTime().then(setTime);
    }
  }, [synergyFinance]);
  return time;
};

export default useClaimRewardTimerBoardroom;
