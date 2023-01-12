import React, { useMemo, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useWallet from 'use-wallet';
import { Box, Button, Card, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../components/Page';
import useModal from '../../hooks/useModal';
import AccountModal from '../../components/Nav/AccountModal';
import WalletProviderModal from '../../components/WalletProviderModal';

import { Helmet } from 'react-helmet';
import SynergyHomeTitle from '../../assets/img/home-title.png';
import HeroImage from '../../assets/img/home-hero.png';
import HeroBitcoin from '../../assets/img/hero-bitcoin.png';
import HeroBinance from '../../assets/img/hero-binance.png';
import HeroCardano from '../../assets/img/hero-cardano.png';
import HeroLitecion from '../../assets/img/hero-litecoin.png';
import Step1 from '../../assets/img/step1.png';
import Step2 from '../../assets/img/step2.png';
import Step3 from '../../assets/img/step3.png';
import Step4 from '../../assets/img/step4.png';
import NearIcon from '../../assets/img/partner-near.png';

const StyledCard = styled(Card)`
  background-color: #4d32727d;
`;

const TITLE = 'Synergy';

const useStyles = makeStyles((theme) => ({
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '950px',
    width: '100%',
    alignItems: 'center',
    gap: '5px',
    backgroundSize: 'cover',
    background: `linear-gradient(357.1deg, #040B11 28.55%, rgba(4, 11, 17, 0.35) 68.07%), url(${HeroImage})`,
  },
  howtoSection: {
    background: '#040B11',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-100px',
    padding: '12px',
  },
  detailSection: {
    display: 'flex',
    marginTop: '150px',
    padding: '12px',
    color: 'white',
  },
  partnerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '150px',
    padding: '12px',
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
  },
  subtitle1: {
    color: 'white',
    fontSize: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.breakpoints.down('430')]: {
      fontSize: '14px',
    },
  },
  subtitle2: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',
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
            marginTop: '20px',
          }}
        >
          {!account ? (
            <Button
              onClick={handleWalletProviderOpen}
              className="shinyButtonPrimary"
              style={{
                height: "42px",
                minWidth: "200px",
                fontSize: "18px",
                lineHeight: "24px",
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              onClick={onPresentAccountModal}
              className="shinyButtonPrimary"
              style={{
                height: "42px",
                minWidth: "200px",
                fontSize: "18px",
                lineHeight: "24px",
              }}
            >
              Your Wallet
            </Button>
          )}
          <Button
            className="shinyButtonSecondary"
            style={{
              height: "42px",
              minWidth: "200px",
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
          <Grid item xs={12} md={3} lg={3}>
            <Box style={{ background: '#141B22', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center', minHeight: '100px' }}>
                <img src={Step1} style={{ width: '92px', height: '72px' }} />
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

          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Box style={{ background: '#141B22', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step2} style={{ width: '57px', height: '72px' }} />
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
          <Grid item xs={12} md={3} lg={3}>
            <Box style={{ background: '#141B22', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step3} style={{ width: '81px', height: '72px' }} />
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
          <Grid item xs={12} md={3} lg={3}>
            <Box
              style={{
                background: '#141B22',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img src={Step4} style={{ width: '72px', height: '70px' }} />
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
        <Grid container spacing={10}>
          <Grid item xs={12} md={6} lg={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography style={{ fontSize: '44px', }}>
                Our Mission
              </Typography>
              <Typography style={{ fontSize: '18px', fontFamily: 'Poppins', color: '#C2C3C5' }}>
                We want to bridge the gap between the cryptocurrency marke and everyday consumer.
                We'll bring it to the mainstream by removing barriers to access and by helping people
                trust and understand what we believe to be the future of money.
              </Typography>
              <Box style={{ display: 'flex', gap: '50px' }}>
                <Box style={{ marginTop: '40px' }}>
                  <Typography style={{ fontSize: '20px', color: '#C2C3C5' }}>
                    TVL
                  </Typography>
                  <Typography style={{ fontSize: '56px', textShadow: '0px 4px 16px rgba(255,255,255,0.4)' }}>
                    1000+
                  </Typography>
                </Box>
                <Box style={{ marginTop: '40px' }}>
                  <Typography style={{ fontSize: '20px', color: '#C2C3C5' }}>
                    Community members
                  </Typography>
                  <Typography style={{ fontSize: '56px', textShadow: '0px 4px 16px rgba(255,255,255,0.4)' }}>
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
                <Grid item xs={12} md={6} lg={6}>
                  <Box
                    style={{
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
                    }}
                  >
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
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box
                    style={{
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
                    }}
                  >
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
                <Grid item xs={12} md={6} lg={6}>
                  <Box
                    style={{
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
                    }}
                  >
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
                      Highest bonuses on your four first four deposits. Buy Tikects
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box
                    style={{
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
                    }}
                  >
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
              <Typography style={{ fontSize: '44px', }}>
                Power of Blockchain
              </Typography>
              <Typography style={{ fontSize: '18px', fontFamily: 'Poppins', color: '#C2C3C5' }}>
                Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack,
                or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed
                across the entire network of computer systems on the blockchain.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <Typography style={{ fontSize: '44px', }}>
                Purpose Of Crypto
              </Typography>
              <Typography style={{ fontSize: '18px', fontFamily: 'Poppins', color: '#C2C3C5' }}>
                Cryptocurrencies are a new paradigm for money. Their promise is to streamline existing financial architecture
                to make it faster and cheaper. Technology and architecture decentralize existing monetary systems make it
                possible for transacting parties to exchange value independently of intermediary institutions such as banks.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.partnerSection}>
        <Typography className={classes.sectionTitle}>
          <span style={{ color: '#21E786' }}>synergy</span> Partners
        </Typography>
        <Grid container style={{ marginTop: '40px', color: 'white' }} spacing={3}>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center', background: '#141B22' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={NearIcon}></img>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} lg={2}>
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
