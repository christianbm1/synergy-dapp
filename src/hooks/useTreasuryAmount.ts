import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import usePushFinance from './usePushFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const pushFinance = usePushFinance();

  useEffect(() => {
    if (pushFinance) {
      const {Treasury} = pushFinance.contracts;
      pushFinance.PUSH.balanceOf(Treasury.address).then(setAmount);
    }
  }, [pushFinance]);
  return amount;
};

export default useTreasuryAmount;
