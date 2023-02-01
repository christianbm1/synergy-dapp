import React, { useMemo } from 'react';
import { Box, Card, CardActions, CardContent, Typography, Grid, makeStyles } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';
import ActionPanel from './components/ActionPanel';
import useWallet from 'use-wallet';
import useStakedBalance from '../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import { getDisplayBalance } from '../../utils/formatBalance';
import useEarnings from '../../hooks/useEarnings';
import useCrystalStats from '../../hooks/useCrystalStats';
import useShareStats from '../../hooks/useDiamondStats';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    background: '#141B22',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    padding: '12px',
    width: '-webkit-fill-available',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '10px 24px 0px 24px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0px',
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '20px 24px 12px 24px',
  },
  divider: {
    // margin: '0px 30px 20px', 
    background: 'white', 
    opacity: '0.2',

    [theme.breakpoints.down('450')]: {
      margin: '0px 15px 10px', 
    },
  },
  styledCard: {
    borderTopLeftRadius: '50px',
    borderTopRightRadius: '50px',
    border: '4px solid #545454',
    overflow: 'initial',
    paddingBottom: '5px'
  },
}));

const PoolCard = ({ bank }) => {
  const classes = useStyles();
  const { account } = useWallet();
  const statsOnPool = useStatsForPool(bank);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const stakedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
  ).toFixed(2);

  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const diaStats = useShareStats();
  // const crsStats = useCrystalStats();
  const enarTokenPriceInDollars = useMemo(
    () => (diaStats ? Number(diaStats.priceInDollars).toFixed(2) : null),
    [diaStats],
  );
  const earnedInDollars = (Number(enarTokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
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
          <TokenSymbol size={86} symbol={bank.depositTokenName} isLPLogo={true} />
          <Typography style={{ fontSize: '26px', marginRight: '6px' }}>
            {bank.depositTokenName}
          </Typography>
        </Box>
        <Box className={classes.content}>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              APR
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Daily APR
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              TVL
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {statsOnPool?.TVL}$
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Reward
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {getDisplayBalance(earnings, bank.earnToken.decimal, 2)} DIA {`(${earnedInDollars}$)`}
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Staked
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {getDisplayBalance(stakedBalance, bank.depositToken.decimal, 2)} {`${bank.depositTokenName}`} {`(${stakedInDollars}$)`}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.action}>
          <ActionPanel bank={bank} />
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
    </Grid>
  );
};

export default PoolCard;
