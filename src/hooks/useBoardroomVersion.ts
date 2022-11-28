import {useCallback, useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const pushFinance = usePushFinance();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await pushFinance.fetchBoardroomVersionOfUser());
  }, [pushFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (pushFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [pushFinance?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;
