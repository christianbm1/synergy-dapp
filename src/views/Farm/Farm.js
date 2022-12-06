import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';

import { Box, Container, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
//import FarmImage from '../../assets/img/farm.png';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';
import { Helmet } from 'react-helmet'

// import HomeImage from '../../assets/img/background/connection.png';
import Triangle from '../../assets/img/triangle.png';
import TitleImage from '../../assets/img/farm-title.png';
import AvatarImage from '../../assets/img/farm-avatar.jpg';
import PrimaryFarmCard from './PrimaryFarmCard';

// const BackgroundImage = createGlobalStyle`
//   body {
//     background: url(${HomeImage}) repeat !important;
//     background-size: cover !important;
//     background-position-y: top !important;
//     background-color: #171923;
//   }
// `;

const TITLE = 'Synergy | Farms'


const Farm = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          {/* <BackgroundImage /> */}
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Box style={{ position: 'absolute', top: '110px', right: '-4%', zIndex: -1 }}>
            <img src={AvatarImage} width={250}/>
          </Box>
          {!!account ? (
            <Container maxWidth="xl" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
              <Box>
                <img src={TitleImage} alt="Farm Title" style={{ maxHeight: '70px' }} />
                <Box
                  style={{
                    marginTop: 10,
                  }}
                >
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
                  <Box
                    style={{
                      color: "white",
                      marginLeft: 5,
                    }}
                  >
                    <Typography align="left">
                      Stake CRYSTAL or DIAMOND
                    </Typography>
                    <Typography align="left">
                      with BUSD or BNB and get DIAMONDS as reward
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={6} style={{ marginTop: '20px' }}>
                {activeBanks
                  .filter((bank) => bank.sectionInUI === 3)
                  .map((bank) => (
                    <React.Fragment key={bank.name}>
                      <PrimaryFarmCard bank={bank} />
                    </React.Fragment>
                  ))}
              </Grid>

              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 3).length === 0}>
                  <Typography severity="info" align="center" variant="h4" gutterBottom>
                    Earn PSHARE by staking LP
                  </Typography>
                  <Alert variant="filled" severity="info">
                    Farms will be started Aprial 1th 2022 and will continue running for 1 full year.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 3)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography severity="info" align="center" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Earn PSHARE by staking Single Assets
                  </Typography>
                  {/* <Alert variant="filled" severity="info">
                    <h4>
                      Farms started November 25th 2021 and will continue running for 1 full year.
                    </h4>
                  </Alert> */}
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

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                  <Typography severity="info" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Earn CRS by staking LP
                  </Typography>
                  <Alert variant="filled" severity="info">
                    This Farm will be started Aprial 2th 2022 and will alive for 2 weeks.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 1)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography severity="info" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Alert variant="filled" severity="info">
                    Genesis pools will be started March 31th 2022 and will alive for 2 days.
                  </Alert>
                  {/* <Alert variant="filled" severity="warning">
                    Genesis pools have ended. Please claim all rewards and remove funds from Genesis pools.
                  </Alert> */}
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
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
