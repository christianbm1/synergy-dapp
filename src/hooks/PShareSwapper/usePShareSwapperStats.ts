import {useEffect, useState} from 'react';
import usePushFinance from '../usePushFinance';
import {PShareSwapperStat} from '../../push-finance/types';
import useRefresh from '../useRefresh';

const usePShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<PShareSwapperStat>();
  const {fastRefresh /*, slowRefresh*/} = useRefresh();
  const pushFinance = usePushFinance();

  useEffect(() => {
    async function fetchPShareSwapperStat() {
      try {
        if (pushFinance.myAccount) {
          setStat(await pushFinance.getPShareSwapperStat(account));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchPShareSwapperStat();
  }, [setStat, pushFinance, fastRefresh, account]);

  return stat;
};

export default usePShareSwapperStats;
