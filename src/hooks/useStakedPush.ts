import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import usePushFinance from './usePushFinance';
import useRefresh from './useRefresh';

const useStakedPush = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const pushFinance = usePushFinance();
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await pushFinance.getStakedPush());
      } catch (e) {
        console.error(e);
      }
    }
    fetchBalance();
  }, [slowRefresh, pushFinance]);
  return balance;
};

export default useStakedPush;
