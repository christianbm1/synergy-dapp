import React from 'react';
import styled from 'styled-components';

//Graveyard ecosystem logos
import crsLogo from '../../assets/img/crystal.png'
import diaLogo from '../../assets/img/diamond.png'

import pushFtmLpLogo from '../../assets/img/push-bitcoin-LP.png';
import pshareFtmLpLogo from '../../assets/img/pshare-bnb-LP.png';
import pushPshareLpLogo from '../../assets/img/push-pshare-LP.png';

import bnbLogo from '../../assets/img/bnb.png';
import daiLogo from '../../assets/img/dai.png';
import busdLogo from '../../assets/img/busd.png';

import symbol_bg from '../../assets/img/symbol_bg.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  CRS: crsLogo,
  DIA: diaLogo,
  BNB: bnbLogo,
  WBNB: bnbLogo,
  BUSD: busdLogo,
  DAI: daiLogo,
  USDT: daiLogo,
  'CRS/BUSD': pushFtmLpLogo,
  'CRYSTAL/DIAMOND': pushPshareLpLogo,
  'DIAMOND/CRYSTAL': pushFtmLpLogo,
  'DIA/BNB': pshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
  isLPLogo?: boolean;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 95, isLPLogo = false }) => {

  if (isLPLogo) {
    const tokenList = symbol.split("/");
    // return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size * 1.8} height={size} />;
    return (
      <LPSymbolContainer width={size} height={size}>
        <SymbolContainer width={size} height={size} style={{ zIndex: '2' }}>
          <img src={logosBySymbol[tokenList[0]]} alt={`${tokenList[0]} Logo`} style={{ maxWidth: '45%', maxHeight: '45%' }} />
        </SymbolContainer>
        <SymbolContainer width={size} height={size} style={{ marginLeft: '-25%', zIndex: '1' }}>
          <img src={logosBySymbol[tokenList[1]]} alt={`${tokenList[1]} Logo`} style={{ maxWidth: '45%', maxHeight: '45%' }} />
        </SymbolContainer>
      </LPSymbolContainer>
    );
  } else {
    // return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
    return (
      <SymbolContainer width={size} height={size}>
        <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} style={{ maxWidth: '45%', maxHeight: '45%' }} />
      </SymbolContainer>
    );
  }
};

interface SymbolContainerProps {
  width: number;
  height: number;
}

const LPSymbolContainer = styled.div<SymbolContainerProps>`
  display: flex;
  width: ${(props) => props.width * 1.6}px;
  height: ${(props) => props.height}px;
`;

const SymbolContainer = styled.div<SymbolContainerProps>`
  display: flex;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  justify-content: center;
  background: url(${symbol_bg});
  background-size: cover;
  align-items: center;
`;

export default TokenSymbol;
