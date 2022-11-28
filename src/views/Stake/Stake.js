import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Typography, Grid } from '@material-ui/core';
import { roundAndFormatNumber } from '../../0x';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useXpushBalance from '../../hooks/useXpushBalance';
import useXpushAPR from '../../hooks/useXpushAPR';
import useStakedTotalPushBalance from '../../hooks/useTotalStakedPushBalance';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'

import HomeImage from '../../assets/img/background.png';
import useFetchPushAPR from '../../hooks/useFetchPushAPR';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'pushmoney.money | xPUSH - PUSH Staking'

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Staking = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const xpushBalance = useXpushBalance();
  const xpushRate = Number(xpushBalance / 1000000000000000000).toFixed(4);
  const xpushAPR = useXpushAPR();
  const xpushPrintApr = useFetchPushAPR();
  const xpushPrintAprNice = useMemo(() => (xpushPrintApr ? Number(xpushPrintApr).toFixed(2) : null), [xpushPrintApr]);

  const stakedTotalPushBalance = useStakedTotalPushBalance();
  const pushTotalStaked = Number(stakedTotalPushBalance / 1000000000000000000).toFixed(0);
  const xpushTVL = useMemo(() => (xpushAPR ? Number(xpushAPR.TVL).toFixed(0) : null), [xpushAPR]);
  const xpushYearlyAPR = useMemo(() => (xpushAPR ? Number(xpushAPR.yearlyAPR).toFixed(2) : null), [xpushAPR]);

  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {!!account ? (
        <>
          <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
            PUSH Staking for xPUSH
          </Typography>
          <Grid container justifyContent="center">
            <Box mt={3} style={{ width: '600px' }}>
              <Alert variant="filled" severity="info">
                <b> Most rewards are generated from boardroom printing!</b><br />
                20% of all PUSH minted - from protocol allocation, does not impact PSHARE boardroom printing.<br />
                If TWAP of PUSH peg is not over 1.01, yield will be reduced.<br /><br />
                The APR (Minted PUSH) shown is based on our latest print, and is only applied when the Boardroom is printing (over 1.01 peg at epoch start)<br />
                <br />We are currently in debt phase, APR will be approximately 3x higher once debt is repaid.
              </Alert>
            </Box>
          </Grid>

          <Box mt={5}>
            <Grid container justifyContent="center" spacing={3}>

              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>1 xPUSH =</Typography>
                    <Typography>{Number(xpushRate)} PUSH</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Historic APR</Typography>
                    <Typography>{xpushYearlyAPR}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>APR (Minted PUSH)</Typography>
                    <Typography>{xpushPrintAprNice}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>PUSH Staked</Typography>
                    <Typography>{roundAndFormatNumber(pushTotalStaked)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>xPUSH TVL</Typography>
                    <Typography>${roundAndFormatNumber(xpushTVL, 2)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>


            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  {/* <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper> */}
                  {/* <Spacer /> */}

                  <StyledCardWrapper>

                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  {/* <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper> */}
                  {/* <Spacer /> */}
                  <StyledCardWrapper>
                    <Box>
                      <Card>
                        <CardContent>
                          <h2>About xPUSH & Rewards</h2>
                          {/* <p><strong>We are currently depositing 10,000 PUSH per week into the staking pool until our BTC Single Staking service is launched.</strong></p> */}
                          <p>xPUSH will be the governance token required to cast votes on protocol decisions.</p>
                          <p>20% of all PUSH minted will be deposited into the xPUSH smart contract, increasing the amount of PUSH that can be redeemed for each xPUSH. Rewards will be deposited at random times to prevent abuse.</p>
                          <p>Functionality will be developed around xPUSH including using it as collateral to borrow other assets.</p>
                          <p>Reward structure subject to change based on community voting.</p>
                        </CardContent>
                      </Card>
                    </Box>
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
          </Box>
        </>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Staking;
