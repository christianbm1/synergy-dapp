import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSynergyFinance from './useSynergyFinance';
import useRefresh from './useRefresh';

const useEarningsOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();
  const isUnlocked = synergyFinance?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await synergyFinance.getEarningsOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, synergyFinance, slowRefresh]);

  return balance;
};

export default useEarningsOnBoardroom;
