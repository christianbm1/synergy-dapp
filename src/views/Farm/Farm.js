import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'

import { Box, Container, Typography, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import useBanks from '../../hooks/useBanks';
import Bank from '../Bank';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
import PrimaryFarmCard from './PrimaryFarmCard';

import HomeImage from '../../assets/img/background/initial.png';
import Triangle from '../../assets/img/triangle.png';
import Partner from '../../assets/img/partner.png';
import TitleImage from '../../assets/img/farm-title.png';
import AvatarImage from '../../assets/img/farm-avatar.jpg';
import LImage from '../../assets/img/background/astronaut.png';
import RImage from '../../assets/img/background/satellite.png';

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
  const classes = useStyles();
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
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
    </Page>
  );
};

export default Farm;
