import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import useWallet from 'use-wallet';
import { Box, Button, Card, Container, Divider, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup';
import useModal from '../../hooks/useModal';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useCrystalStats from '../../hooks/useCrystalStats';
import useShareStats from '../../hooks/useDiamondStats';
import useCommunityMember from '../../hooks/useCommunityMember';
import Page from '../../components/Page';
import AccountModal from '../../components/Nav/AccountModal';
import WalletProviderModal from '../../components/WalletProviderModal';
import TokenSymbol from '../../components/TokenSymbol';

import { Helmet } from 'react-helmet';
import HeroImage from '../../assets/img/home-hero.png';
import ICON from '../../assets/img/icon.png';
import Step1 from '../../assets/img/step1.png';
import Step2 from '../../assets/img/step2.png';
import Step3 from '../../assets/img/step3.png';
import Step4 from '../../assets/img/step4.png';
import DexScreener from '../../assets/img/dexscreener.png';
import OnSite from '../../assets/img/onsite.png';
import CoinGecko from '../../assets/img/partners/coingecko.png';
import CMC from '../../assets/img/partners/cmc.png';
import YieldWolf from '../../assets/img/partners/yieldwolf.png';
import Vertek from '../../assets/img/partners/vertek.png';
import GuilderFi from '../../assets/img/partners/guilderfi.png';
import Lingo from '../../assets/img/partners/lingo.png';
import BSCHouse from '../../assets/img/partners/bschouse.png';
import Elongate from '../../assets/img/partners/elongate.png';
import Hunger from '../../assets/img/partners/hunger.png';
import DogeBets from '../../assets/img/partners/dogebets.png';
import Merch1 from '../../assets/img/merch/merch1.png';
import Merch2 from '../../assets/img/merch/merch2.png';
import Merch4 from '../../assets/img/merch/merch4.png';

import { useQuery } from '@apollo/client';
import { CRS_BUSD_TVL } from "../../gql/YieldWolf";

const TITLE = 'Synergy';

const useStyles = makeStyles((theme) => ({
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '950px',
    width: '100%',
    alignItems: 'center',
    gap: '10px',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    background: `linear-gradient(357.1deg, #040B11 28.55%, rgba(4, 11, 17, 0.35) 68.07%), url(${HeroImage})`,

    [theme.breakpoints.down('1025')]: {
      height: '700px',
    },

    [theme.breakpoints.down('770')]: {
      // marginTop: 
    },

    [theme.breakpoints.down('450')]: {
      backgroundPositionY: '50px',
    },
  },
  howtoSection: {
    background: '#040B11',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-100px',
    padding: '24px',
  },
  detailSection: {
    display: 'flex',
    marginTop: '150px',
    padding: '24px',
    color: 'white',
  },
  partnerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '150px',
    padding: '24px',
    color: 'white',
  },
  merchSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px',
    padding: '24px',
    color: 'white',
  },
  partnerCard: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '120px',
    alignItems: 'center',
    backgroundSize: 'cover',

    [theme.breakpoints.down('768')]: {
      height: '80px',
    },
    [theme.breakpoints.down('430')]: {
      height: '50px',
    },
  },
  merchContainer: {
    display: 'flex',
    gap: '30px',
    // [theme.breakpoints.down('430')]: {
    //   flexDirection: 'column'
    // },
  },
  merchCard: {
    display: 'flex',
    justifyContent: 'center',
    width: '200px',
    height: '200px',
    alignItems: 'center',
    backgroundSize: 'cover',

    [theme.breakpoints.down('768')]: {
      width: '100px',
      height: '100px',
    },
    [theme.breakpoints.down('430')]: {
      width: '80px',
      height: '80px',
    },
  },
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
  title: {
    color: 'white',
    fontSize: '80px',
    lineHeight: '80px',
    textAlign: 'center',
    textTransform: 'uppercase',

    [theme.breakpoints.down('1025')]: {
      fontSize: '55px',
      lineHeight: '55px',
    },

    [theme.breakpoints.down('450')]: {
      fontSize: '40px',
      lineHeight: '40px',
    },
  },
  subtitle1: {
    color: 'white',
    fontSize: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    textTransform: 'uppercase',

    [theme.breakpoints.down('1025')]: {
      fontSize: '25px',
      lineHeight: '25px',
    },

    [theme.breakpoints.down('430')]: {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
  subtitle2: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',
    maxWidth: '90%',

    [theme.breakpoints.down('1025')]: {
      fontSize: '16px',
      lineHeight: '18px',
    },

    [theme.breakpoints.down('430')]: {
      fontSize: '14px',
    },
  },
  sectionTitle: {
    color: 'white',
    fontSize: '44px',
    lineHeight: '56px',
    textAlign: 'center',
    textTransform: 'uppercase',

    [theme.breakpoints.down('430')]: {
      fontSize: '34px',
      lineHeight: '34px',
    },
  },
  sectionSubTitle: {
    color: 'white',
    fontSize: '44px',
    lineHeight: '56px',

    [theme.breakpoints.down('430')]: {
      fontSize: '34px',
      lineHeight: '34px',
    },
  },
  text: {
    color: '#C2C3C5',
    fontSize: '18px',
    fontFamily: 'Poppins',

    [theme.breakpoints.down('430')]: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },
  overviewContainer: {
    display: 'flex',
    gap: '50px',

    [theme.breakpoints.down('430')]: {
      gap: '20px',
      justifyContent: 'space-between',
    },
  },
  overviewTitle: {
    fontSize: '20px',
    color: '#C2C3C5',

    [theme.breakpoints.down('430')]: {
      fontSize: '16px',
      lineHeight: '28px',
    },

    [theme.breakpoints.down('375')]: {
      fontSize: '14px',
      lineHeight: '24px',
    },
  },
  overviewValue: {
    fontSize: '56px',
    textShadow: '0px 4px 16px rgba(255,255,255,0.4)',

    [theme.breakpoints.down('430')]: {
      fontSize: '44px',
      lineHeight: '44px',
    },

    [theme.breakpoints.down('375')]: {
      fontSize: '40px',
      lineHeight: '40px',
    },
  },
  stepCardContent: {
    background: '#141B22',
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    position: 'relative',
    alignItems: 'center',
    padding: '24px',
    gap: '20px',

    [theme.breakpoints.between('900', '1200')]: {
      height: '230px',
    },
  },
  icon1: {
    width: '250px',
    height: '250px',
    marginLeft: '20px',
    marginTop: '-100px',
    position: 'absolute',
    zIndex: '-1',

    [theme.breakpoints.down('430')]: {
      width: '150px',
      height: '150px',
      marginLeft: '-50px',
      marginTop: '-80px',
    },
  },
  icon2: {
    width: '250px',
    height: '250px',
    transform: 'rotate(-80deg)',
    marginRight: '100px',
    marginTop: '300px',
    position: 'absolute',
    zIndex: '-1',
    right: 0,

    [theme.breakpoints.down('1500')]: {
      display: 'none'
    },
  },
  icon3: {
    width: '250px',
    height: '250px',
    transform: 'rotate(-80deg)',
    marginLeft: '-100px',
    marginTop: '150px',
    position: 'absolute',
    zIndex: '-1',
    left: 0,

    [theme.breakpoints.down('1500')]: {
      display: 'none'
    },
  },
  cardContainer: {
    background: '#141B22',
    paddingBottom: '5px',
    display: 'block',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px',
    alignItems: 'center',

    [theme.breakpoints.down('450')]: {
      padding: '20px 15px 15px 15px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '0px 24px 20px',

    [theme.breakpoints.down('450')]: {
      padding: '12px 15px 10px 15px',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0px',
  },
  rowTitle: {
    fontFamily: 'Poppins',
    fontSize: '18px',

    [theme.breakpoints.down('450')]: {
      fontSize: '14px',
    },
  },
  rowValue: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    color: '#21E786',

    [theme.breakpoints.down('450')]: {
      fontSize: '14px',
    },
  },
  divider: {
    margin: '0px 24px 20px',
    background: 'white',
    opacity: '0.2',

    [theme.breakpoints.down('450')]: {
      margin: '0px 15px 10px',
    },
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '0px 20px 24px',

    [theme.breakpoints.down('450')]: {
      padding: '0px 15px 12px 15px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const xsmall = useMediaQuery('(max-width:320px)');

  const { loading, error, data } = useQuery(CRS_BUSD_TVL);
  const tvlYieldWolf = useMemo(
    () => (data ? data.pool.tvl : 0),
    [data],
  );

  const TVL = useTotalValueLocked();
  const totalMembers = useCommunityMember();
  const crsStats = useCrystalStats();
  const crsPriceInDollars = useMemo(
    () => (crsStats ? Number(crsStats.priceInDollars).toFixed(2) : 0),
    [crsStats],
  );
  const crsCirculatingSupply = useMemo(() => (crsStats ? Number(crsStats.circulatingSupply).toFixed(2) : 0), [crsStats]);
  const crsTotalSupply = useMemo(() => (crsStats ? Number(crsStats.totalSupply).toFixed(2) : 0), [crsStats]);
  const crsMarketCap = Number(crsPriceInDollars * crsTotalSupply).toFixed(2);

  const diaStats = useShareStats();
  const diaPriceInDollars = useMemo(
    () => (crsStats ? Number(diaStats.priceInDollars).toFixed(2) : 0),
    [diaStats],
  );
  const diaCirculatingSupply = useMemo(() => (diaStats ? Number(diaStats.circulatingSupply).toFixed(2) : 0), [diaStats]);
  const diaTotalSupply = useMemo(() => (diaStats ? Number(diaStats.totalSupply).toFixed(2) : 0), [diaStats]);
  const diaMarketCap = Number(diaPriceInDollars * diaTotalSupply).toFixed(2);

  const [onPresentAccountModal] = useModal(<AccountModal />);
  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {/* <BackgroundImage /> */}
      <Box className={classes.heroSection}>
        <Typography className={classes.title}>
          Welcome to Synergy
        </Typography>
        <Typography className={classes.subtitle1}>
          Crypto of People
        </Typography>
        <Typography className={classes.subtitle2}>
          WITH OUR REAL-LIFE APPLICATION, CRYPTOCURRENCY CAN DEVELOP TO ITS FULL POTENTIAL
        </Typography>
        <Box
          style={{
            display: 'flex',
            gap: '20px',
            margin: '20px 10px 0px 10px',
          }}
        >
          {!account ? (
            <Button
              onClick={handleWalletProviderOpen}
              className="shinyButtonPrimary"
              style={{
                height: "42px",
                minWidth: "160px",
                fontSize: "18px",
                lineHeight: "24px",
              }}
            >
              Connect
            </Button>
          ) : (
            <Button
              onClick={onPresentAccountModal}
              className="shinyButtonPrimary"
              style={{
                height: "42px",
                minWidth: xsmall ? "120px" : '160px',
                fontSize: "18px",
                lineHeight: "24px",
              }}
            >
              Wallet
            </Button>
          )}
          <Button
            className="shinyButtonSecondary"
            target="_blank"
            href="http://pancakeswap.com/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xa1A5AD28C250B9383c360c0f69aD57D70379851e"
            style={{
              height: "42px",
              minWidth: xsmall ? "120px" : '160px',
              fontSize: "18px",
              lineHeight: "24px",
            }}
          >
            Buy Tokens
          </Button>
          <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
        </Box>
      </Box>
      <Box className={classes.howtoSection}>
        <Typography className={classes.sectionTitle}>
          How to get started with <span style={{ color: '#21E786' }}>synergy</span>
        </Typography>
        <Grid container style={{ marginTop: '40px', color: 'white' }} spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={6} md={6} lg={3} style={{ position: 'relative' }}>
            <Box
              style={{
                width: '124px',
                height: '100px',
                background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                marginLeft: '-3px',
                marginTop: '-3px',
                position: 'absolute',
                zIndex: '-1',
              }}
            />
            <Box
              style={{
                width: '124px',
                height: '100px',
                background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                marginLeft: '-3px',
                marginTop: '-3px',
                position: 'absolute',
                zIndex: '-1',
                filter: 'blur(4px)',
              }}
            />
            <Box
              style={{
                background: '#141B22',
                display: 'flex',
                height: '246px',
                flexDirection: 'column',
                justifyContent: 'start',
                padding: '12px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step1} height={78} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 1
                </Typography>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '32px' }}>
                  {"Stake LP in CRS/BUSD -> DIA"}
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: '124px',
                height: '100px',
                background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                marginRight: '9px',
                marginBottom: '9px',
                position: 'absolute',
                zIndex: '-1',
                bottom: 0,
                right: 0,
              }}
            />
            <Box
              style={{
                width: '124px',
                height: '100px',
                background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                marginRight: '9px',
                marginBottom: '9px',
                position: 'absolute',
                zIndex: '-1',
                bottom: 0,
                right: 0,
                filter: 'blur(4px)',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Box
              style={{
                background: '#141B22',
                display: 'flex',
                height: '246px',
                flexDirection: 'column',
                justifyContent: 'start',
                padding: '12px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step2} height={78} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 2
                </Typography>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '32px' }}>
                  {"Stake DIA in ARK -> CRS"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Box
              style={{
                background: '#141B22',
                display: 'flex',
                height: '246px',
                flexDirection: 'column',
                justifyContent: 'start',
                padding: '12px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step3} height={78} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 3
                </Typography>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '32px' }}>
                  {"Sell 30% of CRS for profit"}
                </Typography>
              </Box>
            </Box>

          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Box
              style={{
                background: '#141B22',
                display: 'flex',
                height: '246px',
                flexDirection: 'column',
                justifyContent: 'start',
                padding: '12px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step4} height={78} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 4
                </Typography>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '32px' }}>
                  {"ZAP the rest in CRS/BUSD and repeat STEP 1 "}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.detailSection}>
        <img src={ICON} className={classes.icon1} />
        <img src={ICON} className={classes.icon2} />
        <Grid container spacing={8}>
          <Grid item xs={12} md={6} lg={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography className={classes.sectionSubTitle}>
                Our Mission
              </Typography>
              <Typography className={classes.text}>
                At Synergy, we want to bridge the gap between our customers and cryptocurrency markets.
                Synergy will bring this concept into the mainstream by removing barriers, building trust, and providing easier ways
                for people to access their finances. We present what we believe to be, the future of money.
              </Typography>
              <Box className={classes.overviewContainer}>
                <Box style={{ marginTop: '40px' }}>
                  <Typography className={classes.overviewTitle}>
                    TVL
                  </Typography>
                  <Typography className={classes.overviewValue}>
                    <CountUp end={TVL + tvlYieldWolf} separator="," />
                  </Typography>
                </Box>
                <Box style={{ marginTop: '40px' }}>
                  <Typography className={classes.overviewTitle}>
                    Community members
                  </Typography>
                  <Typography className={classes.overviewValue}>
                    {/* 300+ */}
                    <CountUp end={totalMembers} separator="," />
                  </Typography>
                </Box>
              </Box>
              <Button
                className="shinyButtonSecondary"
                component={RouterLink}
                to="/farm"
                style={{
                  marginTop: "40px",
                  height: "48px",
                  minWidth: "150px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Stake Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6} style={{ position: 'relative' }}>
                  <Box
                    style={{
                      width: '124px',
                      height: '100px',
                      background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                      marginLeft: '-3px',
                      marginTop: '-3px',
                      position: 'absolute',
                      zIndex: '-1',
                    }}
                  />
                  <Box
                    style={{
                      width: '124px',
                      height: '100px',
                      background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                      marginLeft: '-3px',
                      marginTop: '-3px',
                      position: 'absolute',
                      zIndex: '-1',
                      filter: 'blur(4px)',
                    }}
                  />
                  <Box className={classes.stepCardContent}>
                    <Typography
                      style={{
                        position: 'absolute',
                        top: 0,
                        fontSize: '80px',
                        color: '#21E786',
                        opacity: '0.3',
                        zIndex: '0',
                      }}
                    >
                      01
                    </Typography>
                    <Typography style={{ fontSize: '24px', marginTop: '36px', zIndex: '1' }}>
                      Daily Earnings
                    </Typography>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
                      Earn tokens passively by staking your assets and collecting big earnings.
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: '124px',
                      height: '100px',
                      background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                      marginRight: '9px',
                      marginBottom: '9px',
                      position: 'absolute',
                      zIndex: '-1',
                      bottom: 0,
                      right: 0,
                    }}
                  />
                  <Box
                    style={{
                      width: '124px',
                      height: '100px',
                      background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                      marginRight: '9px',
                      marginBottom: '9px',
                      position: 'absolute',
                      zIndex: '-1',
                      bottom: 0,
                      right: 0,
                      filter: 'blur(4px)',
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} style={{ position: 'relative' }}>
                  <Box className={classes.stepCardContent}>
                    <Typography
                      style={{
                        position: 'absolute',
                        top: 0,
                        fontSize: '80px',
                        color: '#21E786',
                        opacity: '0.3',
                        zIndex: '0',
                      }}
                    >
                      02
                    </Typography>
                    <Typography style={{ fontSize: '24px', marginTop: '36px', zIndex: '1' }}>
                      Exclusive NFTs
                    </Typography>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
                      We have exclusive, hand-drawn NFTs that will be your access cards for future utilities!
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} style={{ position: 'relative' }}>
                  <Box className={classes.stepCardContent}>
                    <Typography
                      style={{
                        position: 'absolute',
                        top: 0,
                        fontSize: '80px',
                        color: '#21E786',
                        opacity: '0.3',
                        zIndex: '0',
                      }}
                    >
                      03
                    </Typography>
                    <Typography style={{ fontSize: '24px', marginTop: '36px', zIndex: '1' }}>
                      Lottery
                    </Typography>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
                      Play for huge prizes and burn extra $CRS at the same time!
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} style={{ position: 'relative' }}>
                  <Box className={classes.stepCardContent}>
                    <Typography
                      style={{
                        position: 'absolute',
                        top: 0,
                        fontSize: '80px',
                        color: '#21E786',
                        opacity: '0.3',
                        zIndex: '0',
                      }}
                    >
                      04
                    </Typography>
                    <Typography style={{ fontSize: '24px', marginTop: '36px', zIndex: '1' }}>
                      Genesis Pools
                    </Typography>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
                      Deposit whitelisted tokens and start your journey in the Synergy ecosystem!
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} style={{ position: 'relative' }}>
            <Box className={classes.cardContainer}>
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginLeft: '-3px',
                  marginTop: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                }}
              />
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginLeft: '-3px',
                  marginTop: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                  filter: 'blur(4px)',
                }}
              />
              <Box className={classes.header}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px' }}>
                  <TokenSymbol size={xsmall ? 50 : 80} symbol="CRS" />
                  <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'start' }}>
                    <Typography style={{ fontSize: '30px' }}>CRS</Typography>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: '18px' }}>(Crystal)</Typography>
                  </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                  <Link 
                    href="https://dexscreener.com/bsc/0x3411f287c3fc5fbc1be9fcc324d47541ebf220c6"
                    target='_blank'
                  >
                    <img src={DexScreener} height={xsmall ? 25 :40} />
                  </Link>
                  <Link 
                    href="https://bscscan.com/token/0xa1A5AD28C250B9383c360c0f69aD57D70379851e"
                    target='_blank'
                  >
                    <img src={OnSite} height={xsmall ? 20 : 35} />
                  </Link>
                </Box>
              </Box>
              <Divider variant="middle" className={classes.divider} />
              <Box className={classes.content}>
                <Box 
                  className={classes.row} 
                  style={{ 
                    backgroundColor: "#0E1317", 
                    borderRadius: '6px', 
                    padding: '5px 15px', 
                    marginBottom: '10px' 
                  }}
                >
                  <Typography className={classes.rowTitle} style={{ color: '#8F9F97' }}>Price:</Typography>
                  <Typography className={classes.rowValue}>{crsPriceInDollars}$</Typography>
                </Box>
                <Box className={classes.row}>
                  <Typography className={classes.rowTitle}>Market Cap:</Typography>
                  <Typography className={classes.rowValue}>{crsMarketCap}$</Typography>
                </Box>
                <Box className={classes.row}>
                  <Typography className={classes.rowTitle}>Circulation Supply:</Typography>
                  <Typography className={classes.rowValue}>{crsCirculatingSupply}</Typography>
                </Box>
                <Box className={classes.row}>
                  <Typography className={classes.rowTitle}>Total Supply:</Typography>
                  <Typography className={classes.rowValue}>{crsTotalSupply}</Typography>
                </Box>
              </Box>
              <Box className={classes.action}>
                <Button
                  className="shinyButtonPrimary"
                  target="_blank"
                  href="http://pancakeswap.com/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xa1A5AD28C250B9383c360c0f69aD57D70379851e"
                  style={{
                    height: "42px",
                    fontSize: "18px",
                    lineHeight: "24px",
                  }}
                >
                  Buy CRS
                </Button>
              </Box>
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginRight: '-3px',
                  marginBottom: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                  bottom: 0,
                  right: 0,
                }}
              />
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginRight: '-3px',
                  marginBottom: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                  bottom: 0,
                  right: 0,
                  filter: 'blur(4px)',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} style={{ position: 'relative' }}>
            <Box className={classes.cardContainer}>
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginLeft: '-3px',
                  marginTop: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                }}
              />
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginLeft: '-3px',
                  marginTop: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                  filter: 'blur(4px)',
                }}
              />
              <Box className={classes.header}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px' }}>
                  <TokenSymbol size={xsmall ? 50 : 80} symbol="DIA" />
                  <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'start' }}>
                    <Typography style={{ fontSize: '30px' }}>DIA</Typography>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: '18px' }}>(Diamond)</Typography>
                  </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                  <Link 
                    href="https://dexscreener.com/bsc/0x40f3b0a66bca432d19d51ac9d016ecc4deccf0b2"
                    target='_blank'
                  >
                    <img src={DexScreener} height={xsmall ? 25 :40} />
                  </Link>
                  <Link 
                    href=" https://bscscan.com/token/0xcAE4F3977c084aB12B73a920e670e1665B3fA7D5"
                    target='_blank'
                  >
                    <img src={OnSite} height={xsmall ? 20 : 35} />
                  </Link>
                </Box>
              </Box>
              <Divider variant="middle" className={classes.divider} />
              <Box className={classes.content}>
                <Box 
                  className={classes.row} 
                  style={{ 
                    backgroundColor: "#0E1317", 
                    borderRadius: '6px', 
                    padding: '5px 15px', 
                    marginBottom: '10px' 
                  }}
                >
                  <Typography className={classes.rowTitle} style={{ color: '#8F9F97' }}>Price:</Typography>
                  <Typography className={classes.rowValue}>{diaPriceInDollars}$</Typography>
                </Box>
                <Box className={classes.row}>
                  <Typography className={classes.rowTitle}>Market Cap:</Typography>
                  <Typography className={classes.rowValue}>{diaMarketCap}$</Typography>
                </Box>
                <Box className={classes.row}>
                  <Typography className={classes.rowTitle}>Circulation Supply:</Typography>
                  <Typography className={classes.rowValue}>{diaCirculatingSupply}</Typography>
                </Box>
                <Box className={classes.row}>
                  <Typography className={classes.rowTitle}>Total Supply:</Typography>
                  <Typography className={classes.rowValue}>{diaTotalSupply}</Typography>
                </Box>
              </Box>
              <Box className={classes.action}>
                <Button
                  className="shinyButtonPrimary"
                  target="_blank"
                  href="http://pancakeswap.com/swap?inputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&outputCurrency=0xcAE4F3977c084aB12B73a920e670e1665B3fA7D5"
                  style={{
                    height: "42px",
                    fontSize: "18px",
                    lineHeight: "24px",
                  }}
                >
                  Buy DIA
                </Button>
              </Box>
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginRight: '-3px',
                  marginBottom: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                  bottom: 0,
                  right: 0,
                }}
              />
              <Box
                style={{
                  width: '124px',
                  height: '100px',
                  background: 'linear-gradient(to top left, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
                  marginRight: '-3px',
                  marginBottom: '-3px',
                  position: 'absolute',
                  zIndex: '-1',
                  bottom: 0,
                  right: 0,
                  filter: 'blur(4px)',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <Typography className={classes.sectionSubTitle}>
                Power of Blockchain
              </Typography>
              <Typography className={classes.text}>
                Blockchains are next-generation, immutable, public-distribution ledgers. They are secured and validated by an entire
                network of computer servers. This system allows the information to be recorded without being hacked, or duplicated,
                making every piece of information unique, like your valuable assets.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <Typography className={classes.sectionSubTitle}>
                Purpose Of Crypto
              </Typography>
              <Typography className={classes.text}>
                Cryptocurrencies are a new paradigm for money. Their promise is to streamline the existing financial architecture
                to make investing money faster and cheaper. Technology and architecture decentralize existing monetary systems,
                making it possible for transacting parties to exchange value independently of intermediary institutions such as banks.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.partnerSection}>
        <img src={ICON} className={classes.icon3} />
        <Typography className={classes.sectionTitle}>
          <span style={{ color: '#21E786' }}>synergy</span> Partners
        </Typography>
        <Grid container style={{ marginTop: '40px', color: 'white' }} spacing={6}>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${YieldWolf})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${Vertek})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${Elongate})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${GuilderFi})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${DogeBets})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${CoinGecko})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${BSCHouse})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${CMC})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${Hunger})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              className={classes.partnerCard}
              style={{
                background: `url(${Lingo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.merchSection}>
        <Typography className={classes.sectionTitle}>
          <span style={{ color: '#21E786' }}>synergy</span> Merch
        </Typography>
        <Box className={classes.merchContainer} style={{ marginTop: '40px', color: 'white' }}>
          <Box
            className={classes.merchCard}
            style={{
              background: `url(${Merch1})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <Box
            className={classes.merchCard}
            style={{
              background: `url(${Merch2})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <Box
            className={classes.merchCard}
            style={{
              background: `url(${Merch4})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Home;
