import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import usePushFinance from './usePushFinance';
import {ContractName} from '../push-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const pushFinance = usePushFinance();
  const isUnlocked = pushFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await pushFinance.earnedFromBank(poolName, earnTokenName, poolId, pushFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, pushFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, pushFinance, fetchBalance]);

  return balance;
};

export default useEarnings;
