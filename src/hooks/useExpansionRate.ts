import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {BigNumber} from 'ethers';
import useRefresh from './useRefresh';

const useExpansionRate = (_crystalPrice: string) => {
  const [expansionRate, setExpansionRate] = useState<BigNumber>(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCurrentEpoch() {
      try {
        setExpansionRate(await synergyFinance.getExpansionRate(_crystalPrice));
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [setExpansionRate, _crystalPrice, synergyFinance, slowRefresh]);

  return expansionRate;
};

export default useExpansionRate;
