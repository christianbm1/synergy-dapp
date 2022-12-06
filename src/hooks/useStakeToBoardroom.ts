import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(synergyFinance.stakeShareToBoardroom(amount), `Stake ${amount} DIA to the boardroom`);
    },
    [synergyFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStakeToBoardroom;
