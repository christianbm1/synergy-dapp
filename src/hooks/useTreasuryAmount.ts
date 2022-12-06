import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSynergyFinance from './useSynergyFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    if (synergyFinance) {
      const {Treasury} = synergyFinance.contracts;
      synergyFinance.CRS.balanceOf(Treasury.address).then(setAmount);
    }
  }, [synergyFinance]);
  return amount;
};

export default useTreasuryAmount;
