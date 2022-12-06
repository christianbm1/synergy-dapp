import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {Bank} from '../synergy-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        synergyFinance.stake(bank.contract, bank.poolId, amountBn),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, synergyFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStake;
