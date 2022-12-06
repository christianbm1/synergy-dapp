import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {TokenStat} from '../synergy-finance/types';
import useRefresh from './useRefresh';

const useCrystalStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    async function fetchCrystalPrice() {
      try {
        setStat(await synergyFinance.getCrystalStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCrystalPrice();
  }, [setStat, synergyFinance, fastRefresh]);

  return stat;
};

export default useCrystalStats;
