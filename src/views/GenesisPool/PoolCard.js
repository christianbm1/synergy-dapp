import React, { useMemo } from 'react';
import useWallet from 'use-wallet';
import { Box, Card, CardActions, CardContent, Typography, Grid, makeStyles, CardHeader, Button } from '@material-ui/core';

import useStatsForPool from '../../hooks/useStatsForPool';
import useStakedBalance from '../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useEarnings from '../../hooks/useEarnings';
import useCrystalStats from '../../hooks/useCrystalStats';
import ActionPanel from './components/ActionPanel';
import TokenSymbol from '../../components/TokenSymbol';
import { getDisplayBalance } from '../../utils/formatBalance';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    background: '#141B22',
    paddingBottom: '5px'
  },
  header: {
    background: '#F0B90B',
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '24px 24px 0px 24px',
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
    padding: '0px 24px 24px 24px',
  },
}));

const PoolCard = ({ bank }) => {
  const classes = useStyles();
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

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
      <Box className={classes.cardContainer}>
        <Box className={classes.header}>
          <TokenSymbol size={64} symbol={bank.depositTokenName} />
        </Box>
        <Box className={classes.content}>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '36px' }}>
              {bank.depositTokenName}
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              GPool ROI
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {bank.closedForStaking ? '0.00' : statsOnPool?.weeklyAPR}%
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
              Your Stake
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {getDisplayBalance(stakedBalance, bank.depositToken.decimal, 2)} {`${bank.depositTokenName}`} {`(${stakedInDollars}$)`}
            </Typography>
          </Box>
          <Box className={classes.row} style={{ paddingBottom: '0px' }}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              CRS Earned
            </Typography>
          </Box>
        </Box>
        <Box className={classes.action}>
          <ActionPanel bank={bank} />
        </Box>
      </Box>
    </Grid>
  );
};

export default PoolCard;
