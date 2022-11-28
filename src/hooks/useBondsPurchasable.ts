import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
//import ERC20 from '../push-finance/ERC20';
import usePushFinance from './usePushFinance';
//import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const pushFinance = usePushFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
      try {
        setBalance(await pushFinance.getBondsPurchasable());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondsPurchasable();
  }, [setBalance, pushFinance]);

  return balance;
};

export default useBondsPurchasable;
