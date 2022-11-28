import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import usePushFinance from './usePushFinance';
import useRefresh from './useRefresh';

const useEarningsOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const pushFinance = usePushFinance();
  const isUnlocked = pushFinance?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await pushFinance.getEarningsOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, pushFinance, slowRefresh]);

  return balance;
};

export default useEarningsOnBoardroom;
