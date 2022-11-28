import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import usePushFinance from './usePushFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnBoardroom = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const pushFinance = usePushFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = pushFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await pushFinance.getTotalStakedInBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, pushFinance]);

  return totalStaked;
};

export default useTotalStakedOnBoardroom;
