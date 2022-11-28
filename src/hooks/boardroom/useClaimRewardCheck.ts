import {useEffect, useState} from 'react';
import useRefresh from '../useRefresh';
import usePushFinance from '../usePushFinance';

const useClaimRewardCheck = () => {
  const {slowRefresh} = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const pushFinance = usePushFinance();
  const isUnlocked = pushFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await pushFinance.canUserClaimRewardFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, pushFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
