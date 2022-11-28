import {useEffect, useState} from 'react';
import usePushFinance from '../usePushFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const pushFinance = usePushFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = pushFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await pushFinance.canUserUnstakeFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, pushFinance, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
