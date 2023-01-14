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
import TokenSymbol from '../../components/TokenSymbol';
import { relative } from 'path';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGImage}) 100% 100% / cover no-repeat !important;
    background-position-x: 80% !important;
    background-position-y: top !important;
  }
`;

const TITLE = 'Synergy | ARK'

const useStyles = makeStyles((theme) => ({
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '150px 0px 50px 0px',
    gap: '10px',
  },
  cardSection: {
    display: 'flex',
    justifyContent: 'center',
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
  cardContainer: {
    background: '#141B22',
    width: '690px',
    paddingBottom: '5px',
    display: 'block',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '38px 30px 30px 30px',

    // "&:before": {
    //   width: '124px',
    //   height: '100px',
    //   background: 'linear-gradient(to bottom right, rgba(33,231,134,100), rgba(33,231,134,0) 50%)',
    //   padding: '3px',
    //   marginLeft: '-3px',
    //   marginTop: '-3px',
    //   position: 'absolute',
    //   zIndex: '-1',
    //   alignSelf: 'center',
    //   filter: 'blur(2px)',
    // }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '24px 30px 20px 30px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0px',
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '0px 30px 24px 30px',
  },
  epoch: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '21px',
    fontStyle: 'bold',
    width: 100,
    height: 100,
    borderRadius: 0,
    border: '2px solid #21E786',
    textAlign: 'center',
  },
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
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Box className={classes.titleSection}>
        <Typography className={classes.title}>
          ARK
        </Typography>
        <Typography className={classes.subtitle}>
          ARK is the only place where you get CRYSTALs by staking  <br />
          Stake your DIAMONDs and CRYSTALs as reward!
        </Typography>
      </Box>
      <Box className={classes.cardSection}>
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
            <TokenSymbol size={100} symbol="CRS" />
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', padding: '12px 30px 0px 0px', alignItems: 'end' }}>
                <Typography style={{ fontFamily: 'Poppins', fontSize: '18px' }}>Next Seigniorage</Typography>
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Seigniorage" fontSize='40px'/>
              </Box>
              <Box className={classes.epoch}>
                <Typography style={{ fontFamily: 'Poppins', fontSize: '21px', fontWeight: '600', fontStyle: 'Bold' }}>Epoch</Typography>
                <Typography style={{ fontFamily: 'Poppins', fontSize: '21px', fontWeight: '600', fontStyle: 'Bold' }}>{Number(currentEpoch)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.content}>
            <Box style={{display: 'flex', justifyContent: 'flex-start', padding: '10px 0px'}}>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '36px', fontWeight: 700}} >TVL in ARK:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '36px', color: '#21E786', marginLeft: '20px' }}>637%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography style={{fontFamily: 'Poppins', fontSize: '24px'}}>APR:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#21E786' }}>{boardroomAPR.toFixed(2)}%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography style={{fontFamily: 'Poppins', fontSize: '24px'}}>APR per Epoch:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#21E786' }}>{boardroomEpochAPR.toFixed(2)}%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography style={{fontFamily: 'Poppins', fontSize: '24px'}}>DIAMONDS stacked:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#21E786' }}>{stakedInDollars}$</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography style={{fontFamily: 'Poppins', fontSize: '24px'}}>Total DIAMONDS staked:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#21E786' }}>
                {(Number(getDisplayBalance(totalStaked)) / Number(diaCirculatingSupply) * 100).toFixed(2)}%
              </Typography>
            </Box>
            <Box className={classes.row}>
              <Typography style={{fontFamily: 'Poppins', fontSize: '24px'}}>TWAP:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#21E786' }}>{scalingFactor} BUSD</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography style={{fontFamily: 'Poppins', fontSize: '24px'}}>Expansion Rate:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#21E786' }}>{expansionRate.toFixed(2)}%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography style={{fontFamily: 'Poppins', fontSize: '24px'}}>Next expansion amount:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#21E786' }}>
                {(expansionRate * crsCirculatingSupply / 100).toFixed(2)} CRS
              </Typography>
            </Box>
          </Box>
          <Divider variant="middle" style={{ margin: '0px 30px 20px', background: 'white', opacity: '0.2' }} />
          <Box className={classes.action}>
            <ActionPanel />
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
      </Box>
    </Page >
  );
};

export default Boardroom;
