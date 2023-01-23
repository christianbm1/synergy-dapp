import {useCallback, useEffect, useState} from 'react';

import {BigNumber} from 'ethers';
import useSynergyFinance from './useSynergyFinance';
import {ContractName} from '../synergy-finance';
import config from '../config';
import useRefresh from './useRefresh';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const {fastRefresh} = useRefresh()
  const synergyFinance = useSynergyFinance();
  const isUnlocked = synergyFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await synergyFinance.stakedBalanceOnBank(poolName, poolId, synergyFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, synergyFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, synergyFinance, fetchBalance, fastRefresh]);

  return balance;
};

export default useStakedBalance;
