import React, { useMemo } from 'react';
import useWallet from 'use-wallet';
import { Box, Card, CardActions, CardContent, Typography, Grid, makeStyles } from '@material-ui/core';

import useStatsForPool from '../../hooks/useStatsForPool';
import useStakedBalance from '../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useEarnings from '../../hooks/useEarnings';
import useCrystalStats from '../../hooks/useCrystalStats';
import ActionPanel from './components/ActionPanel';
import TokenSymbol from '../../components/TokenSymbol';
import { getDisplayBalance } from '../../utils/formatBalance';

const useStyles = makeStyles((theme) => ({
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
  const crsStats = useCrystalStats();
  const enarTokenPriceInDollars = useMemo(
    () => (crsStats ? Number(crsStats.priceInDollars).toFixed(2) : null),
    [crsStats],
  );
  const earnedInDollars = (Number(enarTokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Card variant="outlined" className={classes.styledCard}>
        <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-50px'}}>
          <TokenSymbol size={64} symbol={bank.depositTokenName}/>
          <Typography variant="h5" component="h2">
            {bank.depositTokenName}
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            APR
          </Typography>
          <Typography variant="inherit" color="primary">
            {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            TVL
          </Typography>
          <Typography variant="inherit" color="primary">
            {statsOnPool?.TVL}$
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            Your stake
          </Typography>
          <Typography variant="inherit" color="primary">
            {getDisplayBalance(stakedBalance, bank.depositToken.decimal, 2)} {`${bank.depositTokenName}`} {`(${stakedInDollars}$)`}
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            Reward
          </Typography>
          <Typography variant="inherit" color="primary">
            {getDisplayBalance(earnings, bank.earnToken.decimal, 2)} CRS {`(${earnedInDollars}$)`}
          </Typography>
        </CardContent>
        <CardActions style={{ padding: '0px 16px' }}>
          <ActionPanel bank={bank} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PoolCard;
