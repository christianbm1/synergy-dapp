import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSynergyFinance from './useSynergyFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnBoardroom = () => {
  const {fastRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();
  const isUnlocked = synergyFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await synergyFinance.getStakedSharesOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [fastRefresh, isUnlocked, synergyFinance]);
  return balance;
};

export default useStakedBalanceOnBoardroom;
