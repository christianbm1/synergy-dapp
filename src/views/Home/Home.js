import React, { useMemo } from 'react';
import Page from '../../components/Page';
import styled, { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import usePushStats from '../../hooks/usePushStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usepShareStats from '../../hooks/usepShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Push as pushTesting } from '../../push-finance/deployments/deployments.testing.json';
import { Push as pushProd } from '../../push-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import usePushFinance from '../../hooks/usePushFinance';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { Helmet } from 'react-helmet';
import PushImage from '../../assets/img/push-logo-home.png';

import HomeImage from '../../assets/img/background.jpeg';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const StyledCard = styled(Card)`
  background-color: #4d32727d;
`;

const TITLE = 'Synergy';

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const pushFtmLpStats = useLpStatsBTC('PUSH-BTCB-LP');
  const pShareFtmLpStats = useLpStats('PSHARE-BNB-LP');
  const pushStats = usePushStats();
  const pShareStats = usepShareStats();
  const tBondStats = useBondStats();
  const pushFinance = usePushFinance();

  let push;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    push = pushTesting;
  } else {
    push = pushProd;
  }

  const buyPushAddress =
    //  'https://pancakeswap.finance/swap?inputCurrency=0x5CA816d6EEE8E151354aB087b58228518eD85480&outputCurrency=' +
    'https://app.bogged.finance/bsc/swap?tokenIn=0x5CA816d6EEE8E151354aB087b58228518eD85480&tokenOut=' + push.address;
  //https://pancakeswap.finance/swap?outputCurrency=0xCD77F22a17E2f6D35d7bd5A7d9b665C348877FFC';
  const buyPShareAddress =
    'https://app.bogged.finance/bsc/swap?tokenIn=BNB&tokenOut=0xCD77F22a17E2f6D35d7bd5A7d9b665C348877FFC';
  const pushLPStats = useMemo(() => (pushFtmLpStats ? pushFtmLpStats : null), [pushFtmLpStats]);
  const pshareLPStats = useMemo(() => (pShareFtmLpStats ? pShareFtmLpStats : null), [pShareFtmLpStats]);
  const pushPriceInDollars = useMemo(
    () => (pushStats ? Number(pushStats.priceInDollars).toFixed(2) : null),
    [pushStats],
  );
  const pushPriceInBNB = useMemo(() => (pushStats ? Number(pushStats.tokenInFtm).toFixed(4) : null), [pushStats]);
  const pushCirculatingSupply = useMemo(() => (pushStats ? String(pushStats.circulatingSupply) : null), [pushStats]);
  const pushTotalSupply = useMemo(() => (pushStats ? String(pushStats.totalSupply) : null), [pushStats]);

  const pSharePriceInDollars = useMemo(
    () => (pShareStats ? Number(pShareStats.priceInDollars).toFixed(2) : null),
    [pShareStats],
  );
  const pSharePriceInBNB = useMemo(
    () => (pShareStats ? Number(pShareStats.tokenInFtm).toFixed(4) : null),
    [pShareStats],
  );
  const pShareCirculatingSupply = useMemo(
    () => (pShareStats ? String(pShareStats.circulatingSupply) : null),
    [pShareStats],
  );
  const pShareTotalSupply = useMemo(() => (pShareStats ? String(pShareStats.totalSupply) : null), [pShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const pushLpZap = useZap({ depositTokenName: 'PUSH-BTCB-LP' });
  const pshareLpZap = useZap({ depositTokenName: 'PSHARE-BNB-LP' });

  const [onPresentPushZap, onDissmissPushZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        pushLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissPushZap();
      }}
      tokenName={'PUSH-BTCB-LP'}
    />,
  );

  const [onPresentPshareZap, onDissmissPshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        pshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissPshareZap();
      }}
      tokenName={'PSHARE-BNB-LP'}
    />,
  );

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden' }}
        >
          <img src={PushImage} alt="Synergy" style={{ maxHeight: '240px' }} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{ textAlign: 'center' }}>
              <h2>Welcome to Push Money</h2>
              <p>
                PUSH is an algocoin which is designed to follow the price of BTC. Enjoy high yields normally only found
                on high risk assets, but with exposure to BTC instead!
              </p>
              <p>
                <strong>PUSH is pegged via algorithm to a 10,000:1 ratio to BTC. $100k BTC = $10 PUSH PEG</strong>
                {/* Stake your PUSH-BTC LP in the Farm to earn PSHARE rewards. Then stake your earned PSHARE in the
                Boardroom to earn more PUSH! */}
              </p>
              <p>
                <IconTelegram alt="telegram" style={{ fill: '#dddfee', height: '15px' }} /> Join our{' '}
                <a
                  href="https://t.me/pushmoney1"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: '#dddfee' }}
                >
                  Telegram
                </a>{' '}
                to find out more!
              </p>
            </Box>
          </Paper>
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <StyledCard style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2%' }}>
              <Button
                href={buyPushAddress}
                style={{ margin: '0px 15px' }}
                className={'shinyButton ' + classes.button}
              >
                Buy PUSH
              </Button>
              <Button
                href={buyPShareAddress}
                className={'shinyButton ' + classes.button}
                style={{ margin: '0px 15px' }}
              >
                Buy PSHARE
              </Button>
              <Button target="_blank" href="https://dexscreener.com/bsc/0x5CA816d6EEE8E151354aB087b58228518eD85480" className="shinyButton" style={{ margin: '0px 15px' }}>
                PUSH Chart
              </Button>
              <Button target="_blank" href="https://dexscreener.com/bsc/0xCD77F22a17E2f6D35d7bd5A7d9b665C348877FFC" className="shinyButton" style={{ margin: '0px 15px' }}>
                PSHARE Chart
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* PUSH */}
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PUSH" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  pushFinance.watchAssetInMetamask('PUSH');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <h2 style={{ marginBottom: '10px' }}>PUSH</h2>
              10,000 PUSH (1.0 Peg) =
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>{pushPriceInBNB ? pushPriceInBNB : '-.----'} BTC</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${pushPriceInDollars ? roundAndFormatNumber(pushPriceInDollars, 2) : '-.--'} / PUSH
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber(pushCirculatingSupply * pushPriceInDollars, 2)} <br />
                Circulating Supply: {roundAndFormatNumber(pushCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(pushTotalSupply, 2)}
              </span>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* PSHARE */}
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  pushFinance.watchAssetInMetamask('PSHARE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PSHARE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>PSHARE</h2>
              Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {pSharePriceInBNB ? pSharePriceInBNB : '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${pSharePriceInDollars ? pSharePriceInDollars : '-.--'} / PSHARE</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((pShareCirculatingSupply * pSharePriceInDollars).toFixed(2), 2)}{' '}
                <br />
                Circulating Supply: {roundAndFormatNumber(pShareCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(pShareTotalSupply, 2)}
              </span>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* PBOND */}
        <Grid item xs={12} sm={4}>
          <StyledCard>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  pushFinance.watchAssetInMetamask('PBOND');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PBOND" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>PBOND</h2>
              10,000 PBOND
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / PBOND</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)} <br />
                Circulating Supply: {roundAndFormatNumber(tBondCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(tBondTotalSupply, 2)}
              </span>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PUSH-BTCB-LP" />
                </CardIcon>
              </Box>
              <h2>PUSH-BTCB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button disabled onClick={onPresentPushZap} className="shinyButtonDisabledSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {pushLPStats?.tokenAmount ? pushLPStats?.tokenAmount : '-.--'} PUSH /{' '}
                  {pushLPStats?.ftmAmount ? pushLPStats?.ftmAmount : '-.--'} BTCB
                </span>
              </Box>
              <Box>${pushLPStats?.priceOfOne ? pushLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${pushLPStats?.totalLiquidity ? roundAndFormatNumber(pushLPStats.totalLiquidity, 2) : '-.--'}{' '}
                <br />
                Total Supply: {pushLPStats?.totalSupply ? roundAndFormatNumber(pushLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PSHARE-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>PSHARE-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentPshareZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {pshareLPStats?.tokenAmount ? pshareLPStats?.tokenAmount : '-.--'} PSHARE /{' '}
                  {pshareLPStats?.ftmAmount ? pshareLPStats?.ftmAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${pshareLPStats?.priceOfOne ? pshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: $
                {pshareLPStats?.totalLiquidity ? roundAndFormatNumber(pshareLPStats.totalLiquidity, 2) : '-.--'}
                <br />
                Total Supply: {pshareLPStats?.totalSupply ? roundAndFormatNumber(pshareLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
