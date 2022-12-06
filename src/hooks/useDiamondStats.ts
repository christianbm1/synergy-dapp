import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import {TokenStat} from '../synergy-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await synergyFinance.getShareStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, synergyFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
