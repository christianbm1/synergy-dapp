import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSynergyFinance from './useSynergyFinance';
import {ContractName} from '../synergy-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();
  const isUnlocked = synergyFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await synergyFinance.earnedFromBank(poolName, earnTokenName, poolId, synergyFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, synergyFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, synergyFinance, fetchBalance]);

  return balance;
};

export default useEarnings;
