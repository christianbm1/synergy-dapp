import React, { useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import useWallet from 'use-wallet';
import moment from 'moment';

import useBanks from '../../hooks/useBanks';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import PoolCard from './PoolCard';

import TitleImage from '../../assets/img/gpool-title.png';
import BGImage from '../../assets/img/background/gpool.png';
import Triangle from '../../assets/img/triangle.png';
import ProgressCountdown from './components/ProgressCountdown';
import useGPoolTimes from '../../hooks/useGPoolTimes';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGImage}) 100% 100% / cover no-repeat !important;
    background-position-x: 80% !important;
    background-position-y: top !important;
  }
`;

const TITLE = 'Synergy | Genesis Pools';

const useStyles = makeStyles((theme) => ({
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '200px 0px 50px 0px',
    gap: '10px',
  },
  poolSection: {
    display: 'flex',
    padding: '12px',
    marginBottom: '60px',
  },
  title: {
    color: 'white',
    fontSize: '80px',
    lineHeight: '80px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
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
      fontSize: '14px',
    },
  },
  container: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '60px'
    },
  },
  poolContainer: {
    marginTop: '50px',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '60%',
    },
  },
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [banks] = useBanks();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const { from, to } = useGPoolTimes();

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Box className={classes.titleSection}>
        <Typography className={classes.title}>
          Genesis Pools
        </Typography>
        <Typography className={classes.subtitle}>
          Deposit selected tokens & get CRYSTALs as reward. <br/>
          In day 3 CRS/BSD LP will become available for early stake.
        </Typography>
        <Typography className={classes.timer}>
          {
            Date.now() < from.getTime() 
              ?
                <>
                  {"Starts in"}
                  <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={from} description="GPool start time" fontSize='40px' />
                </> 
              :
                <>
                  {"Ends in"}
                  <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="GPool end time" fontSize='40px'/>
                </> 
          }
        </Typography>
      </Box>
      <Box className={classes.poolSection}>
        <Grid container spacing={4} style={{marginTop: '30px', rowGap: '20px'}}>
          {banks
            .filter((bank) => bank.sectionInUI === 0)
            .map((bank) => (
              <React.Fragment key={bank.name}>
                <PoolCard bank={bank} />
              </React.Fragment>
            ))}
        </Grid>
      </Box>
      <Box>
        <Typography className={classes.subtitle}>
          Each partner token will have its own LP<br/>
          right after Genesis pool ends
        </Typography>
      </Box>
    </Page>
  );
};

export default Home;
