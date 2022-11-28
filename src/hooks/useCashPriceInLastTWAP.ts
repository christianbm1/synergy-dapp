import {useCallback, useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import config from '../config';
import {BigNumber} from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const pushFinance = usePushFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await pushFinance.getPushPriceInLastTWAP());
  }, [pushFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch PUSH price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, pushFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
