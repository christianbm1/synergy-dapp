import {useCallback, useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import config from '../config';
import {BigNumber} from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const synergyFinance = useSynergyFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await synergyFinance.getCRSPriceInLastTWAP());
  }, [synergyFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch Crystal price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, synergyFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
