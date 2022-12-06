import {useCallback, useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const synergyFinance = useSynergyFinance();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await synergyFinance.fetchBoardroomVersionOfUser());
  }, [synergyFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (synergyFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [synergyFinance?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;
