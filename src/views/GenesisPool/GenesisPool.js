import React, { useMemo } from 'react';
import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import useWallet from 'use-wallet';
import moment from 'moment';

import useBanks from '../../hooks/useBanks';
import Page from '../../components/Page';
import PoolCard from './PoolCard';

import LImage from '../../assets/img/background/kind.png';
import RImage from '../../assets/img/background/astronaut.png';
import ProgressCountdown from './components/ProgressCountdown';
import useGPoolTimes from '../../hooks/useGPoolTimes';

const TITLE = 'Synergy | Genesis Pools';

const useStyles = makeStyles((theme) => ({
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '200px 24px 0px 24px',
    gap: '10px',
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
    textTransform: 'uppercase',

    [theme.breakpoints.down('430')]: {
      fontSize: '34px',
      lineHeight: '48px',
    },
  },
  subtitle: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',

    [theme.breakpoints.down('430')]: {
      fontSize: '16px',
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
  leftImg: {
    position: 'absolute',
    width: '30%',
    transformOrigin: 'left center',
    left: '0%',
    transform: 'translate(15%, 0%) rotate(90deg)',
    zIndex: '-1',

    [theme.breakpoints.down('1030')]: {
      transform: 'translate(15%, 100%) rotate(90deg)',
    },

    [theme.breakpoints.down('450')]: {
      transform: 'translate(15%, 250%) rotate(90deg)',
    },

    [theme.breakpoints.down('350')]: {
      transform: 'translate(15%, 400%) rotate(90deg)',
    },
  },
  rightImg: {
    position: 'absolute',
    width: '30%',
    transformOrigin: 'right center',
    right: '0%',
    transform: 'translate(16%, -15%) rotate(-40deg)',
    zIndex: '-1',

    [theme.breakpoints.down('1030')]: {
      transform: 'translate(16%, 10%) rotate(-40deg)',
    },

    [theme.breakpoints.down('800')]: {
      transform: 'translate(16%, 15%) rotate(-40deg)',
    },

    [theme.breakpoints.down('450')]: {
      transform: 'translate(16%, 50%) rotate(-40deg)',
    },

    [theme.breakpoints.down('350')]: {
      transform: 'translate(16%, 100%) rotate(-40deg)',
    },
  },
}));

const Home = () => {
  const small = useMediaQuery('(min-width:425px)');
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
      {/* <BackgroundImage /> */}
      <img src={LImage} className={classes.leftImg} />
      <img src={RImage} className={classes.rightImg} />
      <Box className={classes.titleSection}>
        <Typography className={classes.title}>
          Genesis Pools
        </Typography>
        <Typography className={classes.subtitle}>
          Deposit selected tokens and get CRYSTALs as a reward. <br />
          On day 2, CRS/BUSD LP will become available for early staking.
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
                  description="GPool start time"
                  fontSize={small ? '40px' : '30px'}
                />
              </>
              :
              <>
                {"Ends in"}
                <ProgressCountdown
                  base={moment().toDate()}
                  hideBar={true}
                  deadline={to}
                  description="GPool end time"
                  fontSize={small ? '40px' : '30px'}
                />
              </>
          }
        </Box>
      </Box>
      <Box className={classes.poolSection}>
        <Grid container spacing={4} style={{ marginTop: '30px', rowGap: '20px' }}>
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
          Each partner token will have its own LP<br />
          right after Genesis pool ends
        </Typography>
      </Box>
    </Page>
  );
};

export default Home;
