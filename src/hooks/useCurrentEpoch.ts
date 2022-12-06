import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {BigNumber} from 'ethers';
import useRefresh from './useRefresh';

const useCurrentEpoch = () => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCurrentEpoch() {
      try {
        setCurrentEpoch(await synergyFinance.getCurrentEpoch());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [setCurrentEpoch, synergyFinance, slowRefresh]);

  return currentEpoch;
};

export default useCurrentEpoch;
