import {useEffect, useState} from 'react';
import useSynergyFinance from '../useSynergyFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const synergyFinance = useSynergyFinance();
  const {fastRefresh} = useRefresh();
  const isUnlocked = synergyFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await synergyFinance.canUserUnstakeFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, synergyFinance, fastRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
