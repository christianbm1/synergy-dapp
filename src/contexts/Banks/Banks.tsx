import React, {useCallback, useEffect, useState} from 'react';
import Context from './context';
import useSynergyFinance from '../../hooks/useSynergyFinance';
import {Bank} from '../../synergy-finance';
import config, {bankDefinitions} from '../../config';

const Banks: React.FC = ({children}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const synergyFinance = useSynergyFinance();
  const isUnlocked = synergyFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];
    console.log("fetchPools / bankDefinition : ", bankDefinitions);

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!synergyFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await synergyFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          synergyFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      console.log("fetchPools / bankInfo : ", bankInfo);
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: synergyFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'CRS' ? synergyFinance.CRS : synergyFinance.DIA,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [synergyFinance, setBanks]);

  useEffect(() => {
    if (synergyFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, synergyFinance, fetchPools]);

  return <Context.Provider value={{banks}}>{children}</Context.Provider>;
};

export default Banks;
