import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import SynergyFinance from '../../synergy-finance';
import config from '../../config';

export interface SynergyFinanceContext {
  synergyFinance?: SynergyFinance;
}

export const Context = createContext<SynergyFinanceContext>({synergyFinance: null});

export const SynergyFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [synergyFinance, setSynergyFinance] = useState<SynergyFinance>();

  useEffect(() => {
    if (!synergyFinance) {
      const synergy = new SynergyFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        synergy.unlockWallet(ethereum, account);
      }
      setSynergyFinance(synergy);
    } else if (account) {
      synergyFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, synergyFinance]);

  return <Context.Provider value={{synergyFinance}}>{children}</Context.Provider>;
};
