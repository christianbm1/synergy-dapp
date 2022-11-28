import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import PushFinance from '../../push-finance';
import config from '../../config';

export interface PushFinanceContext {
  pushFinance?: PushFinance;
}

export const Context = createContext<PushFinanceContext>({pushFinance: null});

export const PushFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [pushFinance, setPushFinance] = useState<PushFinance>();

  useEffect(() => {
    if (!pushFinance) {
      const push = new PushFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        push.unlockWallet(ethereum, account);
      }
      setPushFinance(push);
    } else if (account) {
      pushFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, pushFinance]);

  return <Context.Provider value={{pushFinance}}>{children}</Context.Provider>;
};
