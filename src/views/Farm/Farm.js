import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'

import { Box, Button, Typography, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import moment from 'moment';

import useBanks from '../../hooks/useBanks';
import Bank from '../Bank';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
import PrimaryFarmCard from './PrimaryFarmCard';

import LImage from '../../assets/img/background/astronaut.png';
import RImage from '../../assets/img/background/satellite.png';
import useFarmTimes from '../../hooks/useFarmTimes';
import ProgressCountdown from './components/ProgressCountdown';
import VaultCard from './VaultCard';
import TokenSymbol from '../../components/TokenSymbol';
import YieldWolf from '../../assets/img/wolf.png';
import Magik from '../../assets/img/magik.png';
import AC from '../../assets/img/ac.png';

const TITLE = 'Synergy | Farms'

const useStyles = makeStyles((theme) => ({
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '200px 24px 0px 24px',
    marginBottom: '60px',
    gap: '20px',
    position: 'relative',
  },
  partnerSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 24px 0px 24px',
    gap: '20px',
    position: 'relative',
  },
  vaultSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 24px 0px 24px',
    gap: '20px',
    position: 'relative',
  },
  poolSection: {
    display: 'flex',
    padding: '24px',
    marginBottom: '60px',
  },
  title: {
    color: 'white',
    fontSize: '80px',
    lineHeight: '80px',
    textAlign: 'center',
    textTransform: 'capitalize',

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
    // maxWidth: '90%',

    [theme.breakpoints.down('1025')]: {
      fontSize: '16px',
      lineHeight: '18px',
    },

    [theme.breakpoints.down('430')]: {
      fontSize: '14px',
    },
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontSize: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: '20px',
    gap: '15px',

    [theme.breakpoints.down('430')]: {
      fontSize: '34px',
      gap: '10px',
    },

    [theme.breakpoints.down('380')]: {
      fontSize: '24px',
      gap: '10px',
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
  action: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '0px 20px 24px',

    [theme.breakpoints.down('450')]: {
      padding: '0px 15px 12px 15px',
    },
  },
  leftImg: {
    position: 'absolute',
    width: '20%',
    transformOrigin: 'left center',
    left: '0%',
    transform: 'translate(-6%, -10%) rotate(50deg)',
    zIndex: '-1',

    [theme.breakpoints.down('1030')]: {
      transform: 'translate(-10%, 10%) rotate(50deg)',
    },

    [theme.breakpoints.down('450')]: {
      width: '30%',
      transform: 'translate(-10%, 40%) rotate(50deg)',
    },

    [theme.breakpoints.down('350')]: {
      width: '30%',
      transform: 'translate(-10%, 50%) rotate(50deg)',
    },
  },
  rightImg: {
    position: 'absolute',
    width: '25%',
    transformOrigin: 'right center',
    right: '0%',
    transform: 'translate(25%, 55%)',
    zIndex: '-1',

    [theme.breakpoints.down('1030')]: {
      transform: 'translate(30%, 100%)',
    },

    [theme.breakpoints.down('800')]: {
      transform: 'translate(16%, 100%)',
    },

    [theme.breakpoints.down('450')]: {
      width: '40%',
      transform: 'translate(16%, 120%)',
    },

    [theme.breakpoints.down('350')]: {
      width: '40%',
      transform: 'translate(16%, 120%)',
    },
  },
}));

const Farm = () => {
  const small = useMediaQuery('(min-width:430px)');
  const classes = useStyles();
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);

  const { from, to } = useFarmTimes();

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <img src={LImage} className={classes.leftImg} />
      <img src={RImage} className={classes.rightImg} />
      <Box className={classes.titleSection}>
        <Typography className={classes.title}>
          Let Your Resources Work!
        </Typography>
        <Typography className={classes.subtitle1}>
          Farms
        </Typography>
        <Typography className={classes.subtitle2}>
          Stake CRYSTAL or DIAMOND <br />
          with BUSD or BNB and get DIAMONDS as a reward!
        </Typography>
        <Box className={classes.timer}>
          {
            Date.now() < from.getTime()
              ?
              <>
                {"Starts in"}
                <ProgressCountdown
                  base={moment().toDate()}
                  hideBar={true}
                  deadline={from}
                  description="Farm start time"
                  fontSize={small ? '40px' : '30px'}
                />
              </>
              :
              <>
              </>
          }
        </Box>
      </Box>

      <Box className={classes.poolSection}>
        <Grid container spacing={3} style={{ marginTop: '20px', rowGap: '50px' }}>
          {activeBanks
            .filter((bank) => bank.sectionInUI === 1)
            .map((bank) => (
              <React.Fragment key={bank.name}>
                <PrimaryFarmCard bank={bank} />
              </React.Fragment>
            ))}
        </Grid>
      </Box>

      <Box className={classes.partnerSection}>
        <Typography className={classes.title}>
          Partner Farms
        </Typography>
        <Typography className={classes.subtitle2}>
          Combine your token with CRYSTAL <br />
          and take DIAMONDs as a reward!
        </Typography>
      </Box>

      <Box className={classes.poolSection}>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {activeBanks
            .filter((bank) => bank.sectionInUI === 2)
            .map((bank) => (
              <React.Fragment key={bank.name}>
                <FarmCard bank={bank} />
              </React.Fragment>
            ))}
        </Grid>
      </Box>

      <Box className={classes.partnerSection}>
        <Typography className={classes.title}>
          Partner Vaults
        </Typography>
        {/* <Typography className={classes.subtitle2}>
          Combine your token with CRYSTAL <br />
          and take DIAMONDs as a reward!
        </Typography> */}
      </Box>

      <Box className={classes.poolSection}>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} style={{ position: 'relative' }}>
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
                  <TokenSymbol size={small ? 70 : 50} symbol="CRS/BUSD" isLPLogo={true} />
                  <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'start' }}>
                    <Typography style={{ fontSize: '20px' }}>CRS/BUSD</Typography>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: '14px' }}>Autocompounder</Typography>
                  </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                  <img src={YieldWolf} height={small ? 35 : 25} />
                  <img src={AC} height={small ? 30 : 20} />
                </Box>
              </Box>
              <Box className={classes.action}>
                <Button
                  className="shinyButtonPrimary"
                  target="_blank"
                  href="https://yieldwolf.finance/bsc/0xb2C5A04A71426756FCAbD0439E3738373C0A5064/v2-165"
                  style={{
                    height: "42px",
                    fontSize: "18px",
                    lineHeight: "24px",
                    width: '-webkit-fill-available'
                  }}
                >
                  Stake in YieldWolf
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
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} style={{ position: 'relative' }}>
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
                  <TokenSymbol size={small ? 70 : 50} symbol="DIA/BNB" isLPLogo={true} />
                  <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'start' }}>
                    <Typography style={{ fontSize: '20px' }}>DIA/BNB</Typography>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: '14px' }}>Autocompounder</Typography>
                  </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                  <img src={YieldWolf} height={small ? 35 : 25} />
                  <img src={AC} height={small ? 30 : 20} />
                </Box>
              </Box>
              <Box className={classes.action}>
                <Button
                  className="shinyButtonPrimary"
                  target="_blank"
                  href="https://yieldwolf.finance/bsc/0xb2C5A04A71426756FCAbD0439E3738373C0A5064/v2-166"
                  style={{
                    height: "42px",
                    fontSize: "18px",
                    lineHeight: "24px",
                    width: '-webkit-fill-available'
                  }}
                >
                  Stake in YieldWolf
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
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} style={{ position: 'relative' }}>
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
                  <TokenSymbol size={small ? 70 : 50} symbol="CRS/DShare" isLPLogo={true} />
                  <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'start' }}>
                    <Typography style={{ fontSize: '20px' }}>CRS/DShare</Typography>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: '14px' }}>Autocompounder</Typography>
                  </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                  <img src={YieldWolf} height={small ? 35 : 25} />
                  <img src={AC} height={small ? 30 : 20} />
                </Box>
              </Box>
              <Box className={classes.action}>
                <Button
                  className="shinyButtonPrimary"
                  target="_blank"
                  href="https://yieldwolf.finance/bsc/0xb2C5A04A71426756FCAbD0439E3738373C0A5064/v2-167"
                  style={{
                    height: "42px",
                    fontSize: "18px",
                    lineHeight: "24px",
                    width: '-webkit-fill-available'
                  }}
                >
                  Stake in YieldWolf
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
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} style={{ position: 'relative' }}>
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
                  <TokenSymbol size={small ? 70 : 50} symbol="CRS/BUSD" isLPLogo={true} />
                  <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'start' }}>
                    <Typography style={{ fontSize: '20px' }}>CRS/BUSD</Typography>
                    <Typography style={{ fontFamily: 'Poppins', fontSize: '14px' }}>Autocompounder</Typography>
                  </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                  <img src={Magik} height={small ? 35 : 25} width={small ? 35 : 25} />
                  <img src={AC} height={small ? 30 : 20} />
                </Box>
              </Box>
              <Box className={classes.action}>
                <Button
                  className="shinyButtonPrimary"
                  target="_blank"
                  href="https://magik.farm/#/bsc/vault/synergy-crystals-busd"
                  style={{
                    height: "42px",
                    fontSize: "18px",
                    lineHeight: "24px",
                    width: '-webkit-fill-available'
                  }}
                >
                  Stake in Magik
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
        </Grid>
      </Box>

    </Page>
  );
};

export default Farm;
