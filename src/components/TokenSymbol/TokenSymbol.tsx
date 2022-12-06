import React from 'react';

//Graveyard ecosystem logos
import crsLogo from '../../assets/img/crystal.png'
import diaLogo from '../../assets/img/diamond.png'

import pushFtmLpLogo from '../../assets/img/push-bitcoin-LP.png';
import pshareFtmLpLogo from '../../assets/img/pshare-bnb-LP.png';
import pushPshareLpLogo from '../../assets/img/push-pshare-LP.png';

import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/BCTB-icon.png';
import busdLogo from '../../assets/img/BUSD-icon.png'

import empLogo from '../../assets/img/emp.png';
import dibsLogo from '../../assets/img/dibs.png';
import paperLogo from '../../assets/img/paper.png';

const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  CRS: crsLogo,
  DIA: diaLogo,
  WBNB: bnbLogo,
  BUSD: busdLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  EMP: empLogo,
  DIBS: dibsLogo,
  PAPER: paperLogo,
  'CRS-BTCB-LP': pushFtmLpLogo,
  'CRS-DIA-LP': pushPshareLpLogo,
  'DIA-CRS-LP': pushFtmLpLogo,
  'DIA-BNB-LP': pshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 95}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
