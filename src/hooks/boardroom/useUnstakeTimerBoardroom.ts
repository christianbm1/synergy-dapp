import {useEffect, useState} from 'react';
import useSynergyFinance from '../useSynergyFinance';
import {AllocationTime} from '../../synergy-finance/types';
import useRefresh from '../useRefresh';

const useUnstakeTimerBoardroom = () => {
  const {fastRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    if (synergyFinance) {
      synergyFinance.getUserUnstakeTime().then(setTime);
    }
  }, [fastRefresh, synergyFinance]);
  return time;
};

export default useUnstakeTimerBoardroom;
