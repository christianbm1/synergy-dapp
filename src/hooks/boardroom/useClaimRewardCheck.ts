import {useEffect, useState} from 'react';
import useRefresh from '../useRefresh';
import useSynergyFinance from '../useSynergyFinance';

const useClaimRewardCheck = () => {
  const {slowRefresh} = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const synergyFinance = useSynergyFinance();
  const isUnlocked = synergyFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await synergyFinance.canUserClaimRewardFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, synergyFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
