import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSynergyFinance from './useSynergyFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnBoardroom = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = synergyFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await synergyFinance.getTotalStakedInBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, synergyFinance]);

  return totalStaked;
};

export default useTotalStakedOnBoardroom;
