import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import { Box, Card, CardContent, CardActions, Typography, Container, Divider, makeStyles } from '@material-ui/core';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useExpansionRate from '../../hooks/useExpansionRate';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import ProgressCountdown from './components/ProgressCountdown';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'

import BGImage from '../../assets/img/background/ark.png';
import Triangle from '../../assets/img/triangle.png';
import ActionPanel from './components/ActionPanel';
import useSynergyFinance from '../../hooks/useSynergyFinance';
import useShareStats from '../../hooks/useDiamondStats';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGImage}) 100% 100% / cover no-repeat !important;
    background-position-x: 80% !important;
    background-position-y: top !important;
  }
`;

const TITLE = 'Synergy | ARK'

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '60px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '100px',
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '200px',
    },
  },
}));

const Boardroom = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const synergyFinance = useSynergyFinance();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const shareStat = useShareStats();
  const totalStaked = useTotalStakedOnBoardroom();
  const boardroomAPR = useFetchBoardroomAPR();
  const boardroomEpochAPR = boardroomAPR / 1095;
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(2) : null), [cashStat]);
  const crsCirculatingSupply = useMemo(() => (cashStat ? Number(cashStat.circulatingSupply).toFixed(2) : null), [cashStat]);
  const diaCirculatingSupply = useMemo(() => (shareStat ? Number(shareStat.circulatingSupply).toFixed(2) : null), [shareStat]);
  const expansionRate = Number(useExpansionRate(scalingFactor)) * 100 / 10000;
  const { to } = useTreasuryAllocationTimes();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('DIA', synergyFinance.DIA);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(totalStaked))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, totalStaked],
  );
  const stakedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(totalStaked, 18))
  ).toFixed(2);

  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {!!account ? (
        <Container maxWidth='xl' className={classes.container}>
          <Box>
            <Typography align="left" variant="h4">
              ARK
            </Typography>
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
            <Card 
              variant="outlined" 
              style={{ 
                borderRadius: 12, 
                border: '2px solid grey', 
                backgroundColor: 'black',
                boxShadow: '#4a4a49 0px 0px 5px 5px'
              }}
            >
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
                    <Typography style={{ color: '#f9d749' }}>{stakedInDollars}$</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Total DIAMONDS staked:</Typography>
                    <Typography style={{ color: '#f9d749' }}>
                      {(Number(getDisplayBalance(totalStaked)) / Number(diaCirculatingSupply) * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Typography>TWAP:</Typography>
                    <Typography style={{ color: '#f9d749' }}>{scalingFactor} BUSD</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Typography>Expansion Rate:</Typography>
                    <Typography style={{ color: '#f9d749' }}>{expansionRate.toFixed(2)}%</Typography>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Typography>Next expansion amount:</Typography>
                    <Typography style={{ color: '#f9d749' }}>{(expansionRate * crsCirculatingSupply / 100).toFixed(2)} CRS</Typography>
                  </Box>
                </Box>
                <Divider variant="middle" style={{ margin: '10px 0px 10px 0px', backgroundColor: 'grey' }} />
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between', padding: 8 }}>
                <ActionPanel />
              </CardActions>
            </Card>
          </Box>
        </Container>
      ) : (
        <UnlockWallet />
      )}
    </Page >
  );
};

export default Boardroom;
