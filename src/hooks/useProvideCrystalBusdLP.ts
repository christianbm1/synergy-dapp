import {useCallback} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import {TAX_OFFICE_ADDR} from '../utils/constants';

const useProvideCrystalBusdLP = () => {
  const synergyFinance = useSynergyFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideCrystalBusdLP = useCallback(
    (busdAmount: string, crsAmount: string) => {
      const crsAmountBn = parseUnits(crsAmount);
      handleTransactionReceipt(
        synergyFinance.provideCrystalBusdLP(busdAmount, crsAmountBn),
        `Provide CRS-BUSD LP ${crsAmount} ${busdAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [synergyFinance, handleTransactionReceipt],
  );
  return {onProvideCrystalBusdLP: handleProvideCrystalBusdLP};
};

export default useProvideCrystalBusdLP;
