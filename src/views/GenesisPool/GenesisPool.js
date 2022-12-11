import React, { useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import useWallet from 'use-wallet';

import useBanks from '../../hooks/useBanks';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import PoolCard from './PoolCard';

import TitleImage from '../../assets/img/gpool-title.png';
import BGImage from '../../assets/img/background/gpool.png';
import Triangle from '../../assets/img/triangle.png';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGImage}) 100% 100% / cover no-repeat !important;
    background-position-x: 80% !important;
    background-position-y: top !important;
  }
`;

const TITLE = 'Synergy | Genesis Pools';

const useStyles = makeStyles((theme) => ({
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

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      {!!account ? (
        <Container maxWidth="xl" className={classes.container}>
          <Box>
            <img src={TitleImage} alt="Genesis Pool" style={{ maxHeight: '70px' }} />
            <Box
              style={{
                display: 'flex',
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img src={Triangle} alt="Triangle" style={{ maxHeight: '30px' }} />
              <Box
                style={{
                  color: 'white',
                  marginLeft: 5,
                }}
              >
                <Typography align="left">
                  Deposit seleted tokens
                </Typography>
                <Typography align="left">
                  and get CRYSTALS as reward
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.poolContainer}>
            <Typography variant="h4" align="left">
              Ends in 121h 34m 6s
            </Typography>
            <Grid container spacing={3} style={{marginTop: '30px', rowGap: '20px'}}>
              {banks
                .filter((bank) => bank.sectionInUI === 0)
                .map((bank) => (
                  <React.Fragment key={bank.name}>
                    <PoolCard bank={bank} />
                  </React.Fragment>
                ))}
            </Grid>
          </Box>
        </Container>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

export default Home;
