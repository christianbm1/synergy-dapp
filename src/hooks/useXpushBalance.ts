import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import usePushFinance from './usePushFinance';
import useRefresh from './useRefresh';

const useXpushBalance = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const pushFinance = usePushFinance();
  useEffect(() => {
    async function fetchBalance() {
      try {
        const rate = await pushFinance.getXpushExchange();
        setBalance(rate);
      } catch (e) {
        console.error(e);
      }
    }

    fetchBalance();
  }, [setBalance, slowRefresh, pushFinance]);
  return balance;
};

export default useXpushBalance;
