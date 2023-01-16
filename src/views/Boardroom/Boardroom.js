import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import { Box, Card, CardContent, CardActions, Typography, Container, Divider, makeStyles, useMediaQuery } from '@material-ui/core';

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
import LImage from '../../assets/img/background/wing.png';
import RImage from '../../assets/img/background/find.png';
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

    [theme.breakpoints.down('430')]: {
      fontSize: '40px',
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
      lineHeight: '22px',
    },
  },
  cardContainer: {
    background: '#141B22',
    width: '690px',
    maxWidth: '90%',
    paddingBottom: '5px',
    display: 'block',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '38px 30px 30px 30px',
    alignItems: 'center',

    [theme.breakpoints.down('450')]: {
      padding: '20px 15px 15px 15px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '24px 30px 20px 30px',

    [theme.breakpoints.down('450')]: {
      padding: '12px 15px 10px 15px',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0px',
  },
  rowTitle: {
    fontFamily: 'Poppins', 
    fontSize: '24px',

    [theme.breakpoints.down('450')]: {
      fontSize: '16px',
    },
  },
  rowValue: {
    fontFamily: 'Poppins', 
    fontSize: '24px', 
    color: '#21E786',

    [theme.breakpoints.down('450')]: {
      fontSize: '16px',
    },
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '0px 30px 24px 30px',

    [theme.breakpoints.down('450')]: {
      padding: '0px 15px 12px 15px',
    },
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

    [theme.breakpoints.down('450')]: {
      width: 60,
      height: 60,
    },
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
  divider: {
    margin: '0px 30px 20px', 
    background: 'white', 
    opacity: '0.2',

    [theme.breakpoints.down('450')]: {
      margin: '0px 15px 10px', 
    },
  },
  leftImg: {
    position: 'absolute',
    width: '40%',
    transformOrigin: 'left center',
    left: '0%',
    transform: 'translate(-25%, 10%) rotate(45deg)',
    zIndex: '-1',

    [theme.breakpoints.down('1030')]: {
      transform: 'translate(-25%, 200%) rotate(45deg)',
    },

    [theme.breakpoints.down('800')]: {
      transform: 'translate(-25%, -20%) rotate(45deg)',
    },

    [theme.breakpoints.down('450')]: {
      transform: 'translate(-25%, 10%) rotate(45deg)',
    },

    [theme.breakpoints.down('350')]: {
      transform: 'translate(-25%, 10%) rotate(45deg)',
    },
  },
  rightImg: {
    position: 'absolute',
    width: '30%',
    transformOrigin: 'right center',
    right: '0%',
    transform: 'translate(16%, 75%)',
    zIndex: '-1',

    [theme.breakpoints.down('1030')]: {
      transform: 'translate(16%, 100%)',
    },

    [theme.breakpoints.down('800')]: {
      transform: 'translate(16%, 30%)',
    },

    [theme.breakpoints.down('450')]: {
      transform: 'translate(16%, 60%)',
    },

    [theme.breakpoints.down('350')]: {
      transform: 'translate(16%, 100%)',
    },
  },
}));

const Boardroom = () => {
  const small = useMediaQuery('(max-width:425px)');
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
      <img src={LImage} className={classes.leftImg} />
      <img src={RImage} className={classes.rightImg} />
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
            <TokenSymbol size={ small ? 60 : 100} symbol="CRS" />
            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px' }}>
              <Box style={{ display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'end' }}>
                <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '14px' : '18px' }}>Next Seigniorage</Typography>
                <ProgressCountdown 
                  base={moment().toDate()} 
                  hideBar={true} 
                  deadline={to} 
                  description="Next Seigniorage" 
                  fontSize={small ? '24px' : '40px'}
                />
              </Box>
              <Box className={classes.epoch}>
                <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '14px' : '21px', fontWeight: '600', fontStyle: 'Bold' }}>Epoch</Typography>
                <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '14px' : '21px', fontWeight: '600', fontStyle: 'Bold' }}>{Number(currentEpoch)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.content}>
            <Box style={{display: 'flex', justifyContent: 'flex-start', padding: '10px 0px'}}>
              <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '24px' : '36px', fontWeight: 700}} >TVL in ARK:</Typography>
              <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '24px' : '36px', color: '#21E786', marginLeft: '20px' }}>637%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography className={classes.rowTitle}>APR:</Typography>
              <Typography className={classes.rowValue}>{boardroomAPR.toFixed(2)}%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography className={classes.rowTitle}>APR per Epoch:</Typography>
              <Typography className={classes.rowValue}>{boardroomEpochAPR.toFixed(2)}%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography className={classes.rowTitle}>DIAMONDS stacked:</Typography>
              <Typography className={classes.rowValue}>{stakedInDollars}$</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography className={classes.rowTitle}>Total DIAMONDS staked:</Typography>
              <Typography className={classes.rowValue}>
                {(Number(getDisplayBalance(totalStaked)) / Number(diaCirculatingSupply) * 100).toFixed(2)}%
              </Typography>
            </Box>
            <Box className={classes.row}>
              <Typography className={classes.rowTitle}>TWAP:</Typography>
              <Typography className={classes.rowValue}>{scalingFactor} BUSD</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography className={classes.rowTitle}>Expansion Rate:</Typography>
              <Typography className={classes.rowValue}>{expansionRate.toFixed(2)}%</Typography>
            </Box>
            <Box className={classes.row}>
              <Typography className={classes.rowTitle}>Next expansion amount:</Typography>
              <Typography className={classes.rowValue}>
                {(expansionRate * crsCirculatingSupply / 100).toFixed(2)} CRS
              </Typography>
            </Box>
          </Box>
          <Divider variant="middle" className={classes.divider} />
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
