import React from 'react';

//Graveyard ecosystem logos
import pushLogo from '../../assets/img/push.png';
import pShareLogo from '../../assets/img/pshares.png';
import pushLogoPNG from '../../assets/img/push.png';
import xpushLogo from '../../assets/img/xpush.png';

import pShareLogoPNG from '../../assets/img/pshares.png';
import tBondLogo from '../../assets/img/pbond.png';

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
  PUSH: pushLogo,
  PUSHPNG: pushLogoPNG,
  PSHAREPNG: pShareLogoPNG,
  XPUSH: xpushLogo,
  PSHARE: pShareLogo,
  PBOND: tBondLogo,
  WBNB: bnbLogo,
  BUSD: busdLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  EMP: empLogo,
  DIBS: dibsLogo,
  PAPER: paperLogo,
  'PUSH-BTCB-LP': pushFtmLpLogo,
  'PUSH-PSHARE-LP': pushPshareLpLogo,
  'PSHARE-PUSH-LP': pushFtmLpLogo,
  'PSHARE-BNB-LP': pshareFtmLpLogo,
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
