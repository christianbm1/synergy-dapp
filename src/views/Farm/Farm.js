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

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-position-y: top !important;
    background-color: #171923;
  }
`;

const TITLE = 'Synergy | Farms'

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '60px',
      paddingRight: '60px'
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
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Box style={{ position: 'absolute', top: '110px', right: '-4%', zIndex: -1 }}>
            <img src={AvatarImage} width={250} />
          </Box>
          {!!account ? (
            <Container maxWidth="xl" className={classes.container}>
              <Box>
                <img src={TitleImage} alt="Farm Title" style={{ maxHeight: '70px' }} />
                <Box style={{ marginTop: 10 }}>
                  <Typography align="left" variant="h4">
                    FARM
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img src={Triangle} alt="Triangle" style={{ maxHeight: '30px' }} />
                  <Box style={{ color: "white", marginLeft: 5 }}>
                    <Typography align="left">
                      Stake CRYSTAL or DIAMOND
                    </Typography>
                    <Typography align="left">
                      with BUSD or BNB and get DIAMONDS as reward
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {activeBanks
                  .filter((bank) => bank.sectionInUI === 1)
                  .map((bank) => (
                    <React.Fragment key={bank.name}>
                      <PrimaryFarmCard bank={bank} />
                    </React.Fragment>
                  ))}
              </Grid>
              <Box style={{ marginTop: '80px' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'bottom', gap: '5px' }}>
                  <Typography align="left" variant="h4">
                    Partner Farms
                  </Typography>
                  <img src={Partner} alt="Partner" style={{ maxHeight: '35px' }} />
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img src={Triangle} alt="Triangle" style={{ maxHeight: '30px' }} />
                  <Box style={{ color: "white", marginLeft: 5 }}>
                    <Typography align="left">
                      Combine your token with CRYSTAL
                    </Typography>
                    <Typography align="left">
                      and take DIAMONDs as reward
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          {/* <BackgroundImage /> */}
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Farm;
