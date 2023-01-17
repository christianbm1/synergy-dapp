import React, { useMemo, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useWallet from 'use-wallet';
import { Box, Button, Card, Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../components/Page';
import useModal from '../../hooks/useModal';
import AccountModal from '../../components/Nav/AccountModal';
import WalletProviderModal from '../../components/WalletProviderModal';

import { Helmet } from 'react-helmet';
import HeroImage from '../../assets/img/home-hero.png';
import HeroBitcoin from '../../assets/img/hero-bitcoin.png';
import HeroBinance from '../../assets/img/hero-binance.png';
import HeroCardano from '../../assets/img/hero-cardano.png';
import HeroLitecion from '../../assets/img/hero-litecoin.png';
import ICON from '../../assets/img/icon.png';
import Step1 from '../../assets/img/step1.png';
import Step2 from '../../assets/img/step2.png';
import Step3 from '../../assets/img/step3.png';
import Step4 from '../../assets/img/step4.png';
import NearIcon from '../../assets/img/partner-near.png';

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
  video: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-30%',
    width: '100%',
    zIndex: -1,
    [theme.breakpoints.down('1450')]: {
      bottom: '-20%',
    },
    [theme.breakpoints.down('1000')]: {
      bottom: '-10%',
    },
    [theme.breakpoints.down('700')]: {
      bottom: '-5%',
    },
  }
}));

const Home = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const xsmall = useMediaQuery('(max-width:320px)');

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
          Without the real world application, cryptocurrency can't develop to its full potential
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
            style={{
              height: "42px",
              minWidth: xsmall ? "120px" : '160px',
              fontSize: "18px",
              lineHeight: "24px",
            }}
          >
            Docs
          </Button>
          <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
        </Box>
      </Box>
      <Box className={classes.howtoSection}>
        <Typography className={classes.sectionTitle}>
          How to start <span style={{ color: '#21E786' }}>synergy</span> work
        </Typography>
        <Grid container style={{ marginTop: '40px', color: 'white' }} spacing={3}>
          <Grid item xs={12} sm={6} md={3} lg={3} style={{ position: 'relative' }}>
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
                flexDirection: 'column', 
                justifyContent: 'space-between',
                padding: '24px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step1} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 1
                </Typography>
                <Typography align="center" style={{ fontSize: '24px', lineHeight: '32px' }}>
                  Connect Your Wallet
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
          <Grid item xs={12} sm={6} md={3} lg={3}>
          <Box 
              style={{ 
                background: '#141B22', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                padding: '24px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step2} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 2
                </Typography>
                <Typography align="center" style={{ fontSize: '24px', lineHeight: '32px' }}>
                  Select Your Quaility
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
          <Box 
              style={{ 
                background: '#141B22', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                padding: '24px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step3} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 3
                </Typography>
                <Typography align="center" style={{ fontSize: '24px', lineHeight: '32px' }}>
                  Confirm The Transaction
                </Typography>
              </Box>
            </Box>

          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Box 
              style={{ 
                background: '#141B22', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                padding: '24px',
                gap: '20px',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step4} />
              </Box>
              <Box>
                <Typography align="center" style={{ fontSize: '22px', lineHeight: '30px', color: '#21E786' }}>
                  Step 4
                </Typography>
                <Typography align="center" style={{ fontSize: '24px', lineHeight: '32px' }}>
                  Receive Your Fees
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
                We want to bridge the gap between the cryptocurrency marke and everyday consumer.
                We'll bring it to the mainstream by removing barriers to access and by helping people
                trust and understand what we believe to be the future of money.
              </Typography>
              <Box className={classes.overviewContainer}>
                <Box style={{ marginTop: '40px' }}>
                  <Typography className={classes.overviewTitle}>
                    TVL
                  </Typography>
                  <Typography className={classes.overviewValue}>
                    1000+
                  </Typography>
                </Box>
                <Box style={{ marginTop: '40px' }}>
                  <Typography className={classes.overviewTitle}>
                    Community members
                  </Typography>
                  <Typography className={classes.overviewValue}>
                    2240+
                  </Typography>
                </Box>
              </Box>
              <Button
                className="shinyButtonSecondary"
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
                      Daily Earning
                    </Typography>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
                      Earn  tokens passively by staking your assets & collect big earning.
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
                      We will have Exclusive NFTs. You can stake and earn double rewards
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
                      Highest bonuses on your four first four deposits. Buy Tickets
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
                      The delicate curves and freeform shape, the Genesis brings harmony to your...
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <Typography className={classes.sectionSubTitle}>
                Power of Blockchain
              </Typography>
              <Typography className={classes.text}>
                Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack,
                or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed
                across the entire network of computer systems on the blockchain.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <Typography className={classes.sectionSubTitle}>
                Purpose Of Crypto
              </Typography>
              <Typography className={classes.text}>
                Cryptocurrencies are a new paradigm for money. Their promise is to streamline existing financial architecture
                to make it faster and cheaper. Technology and architecture decentralize existing monetary systems make it
                possible for transacting parties to exchange value independently of intermediary institutions such as banks.
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
        <Grid container style={{ marginTop: '40px', color: 'white' }} spacing={3}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default Home;
