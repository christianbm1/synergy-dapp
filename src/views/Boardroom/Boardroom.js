import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, CardActions, Button, Typography, Grid, Container, CardHeader, Divider } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import ProgressCountdown from './components/ProgressCountdown';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'

import BGImage from '../../assets/img/background/ark.png';
import Triangle from '../../assets/img/triangle.png';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGImage}) 100% 100% / cover no-repeat !important;
    background-position-x: 80% !important;
    background-position-y: top !important;
  }
`;

const TITLE = 'Synergy | ARK'

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
  stake: {
    fontSize: '1rem !important',
    minWidth: '48px !important',
    backgroundColor: '#232227 !important',
    color: 'white !important',
  },
  claim: {
    fontSize: '1rem !important',
    backgroundColor: '#232227 !important',
    color: 'white !important',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    flexGrow: 1,
  },
}));

const Boardroom = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnBoardroom();
  const boardroomAPR = useFetchBoardroomAPR();
  const boardroomEpochAPR = boardroomAPR / 1095;
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();
  console.log("Boardroom / to : ", to);

  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {!!account ? (
        <Container maxWidth="xl" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <Box>
            <Box
              style={{
                marginTop: 10,
              }}
            >
              <Typography align="left" variant="h4">
                ARK
              </Typography>
            </Box>
            <Box
              style={{
                display: 'flex',
                marginTop: 10,
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
                  ARK is the only place
                </Typography>
                <Typography align="left">
                  where you get CRYSTALs by staking
                </Typography>
              </Box>
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
                  Stake your DIAMONDs and CRYSTALs as reward!
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box style={{ marginTop: '50px', maxWidth: "400px" }}>
            <Card variant="outlined" style={{ borderRadius: 12, border: '2px solid grey', backgroundColor: 'black' }}>
              <CardContent style={{ padding: 8, display: 'flex', flexDirection: 'column' }}>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: 70,
                      height: 60,
                      borderRadius: 12,
                      backgroundColor: '#272f38',
                      textAlign: 'center',
                    }}
                  >
                    <Typography style={{ fontWeight: 600 }}>Epoch</Typography>
                    <Typography style={{ fontWeight: 600 }}>{Number(currentEpoch)}</Typography>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderRadius: 12,
                      textAlign: 'center',
                      marginLeft: 10,
                      flexGrow: 1,
                    }}
                  >
                    <Typography style={{ color: '#f9d749' }}>Next Seigniorage</Typography>
                    <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Seigniorage" />
                  </Box>
                </Box>
                <Divider variant="middle" style={{ margin: '8px 0px 10px 0px', backgroundColor: 'grey' }} />
                <Box style={{ padding: '0px 5px' }}>
                  <Box style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                    <Typography style={{ fontSize: 20, fontWeight: 700, marginRight: 10 }} >TVL in ARK:</Typography>
                    <Typography style={{ fontSize: 20 }}>637%</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>APR:</Typography>
                    <Typography style={{ color: '#f9d749' }}>{boardroomAPR.toFixed(2)}%</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>APR per Epoch:</Typography>
                    <Typography style={{ color: '#f9d749' }}>{boardroomEpochAPR.toFixed(2)}%</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>DIAMONDS stacked:</Typography>
                    <Typography style={{ color: '#f9d749' }}>{getDisplayBalance(totalStaked)}</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total DIAMONDS staked:</Typography>
                    <Typography style={{ color: '#f9d749' }}>637%</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Typography>TWAP:</Typography>
                    <Typography style={{ color: '#f9d749' }}>{scalingFactor} BUSD</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Typography>Expansion Rate:</Typography>
                    <Typography style={{ color: '#f9d749' }}>637%</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Typography>Next expansion amount:</Typography>
                    <Typography style={{ color: '#f9d749' }}>637%</Typography>
                  </Box>
                </Box>
                <Divider variant="middle" style={{ margin: '10px 0px 10px 0px', backgroundColor: 'grey' }} />
              </CardContent>
              <CardActions style={{justifyContent: 'space-between', padding: 0}}>
                <Button className={classes.stake}>
                  -
                </Button>
                <Button className={classes.claim}>
                  Claim
                </Button>
                <Button className={classes.stake}>
                  +
                </Button>
              </CardActions>
            </Card>
          </Box>
          {/* <Box mt={5}>
            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper>
                  <Spacer />
                  <StyledCardWrapper>
                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
          </Box>

          <Box mt={5}>
            <Grid container justifyContent="center" spacing={3} mt={10}>
              <Button
                disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
                className={
                  stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)
                    ? 'shinyButtonDisabledSecondary'
                    : 'shinyButtonSecondary'
                }
              >
                Claim &amp; Withdraw
              </Button>
            </Grid>
          </Box> */}
        </Container>
      ) : (
        <UnlockWallet />
      )}
    </Page >
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

export default Boardroom;
