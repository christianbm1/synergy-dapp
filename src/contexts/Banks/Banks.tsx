import React, {useCallback, useEffect, useState} from 'react';
import Context from './context';
import usePushFinance from '../../hooks/usePushFinance';
import {Bank} from '../../push-finance';
import config, {bankDefinitions} from '../../config';

const Banks: React.FC = ({children}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const pushFinance = usePushFinance();
  const isUnlocked = pushFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!pushFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await pushFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          pushFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: pushFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'PUSH' ? pushFinance.PUSH : pushFinance.PSHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [pushFinance, setBanks]);

  useEffect(() => {
    if (pushFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, pushFinance, fetchPools]);

  return <Context.Provider value={{banks}}>{children}</Context.Provider>;
};

export default Banks;
