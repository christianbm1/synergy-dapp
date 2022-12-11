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
    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
      <Card variant="outlined" className={classes.styledCard}>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-50px' }}>
          <TokenSymbol size={64} symbol={bank.depositTokenName} isLPLogo={true} />
          <Typography variant="h5" component="h3">
            {bank.depositTokenName}
          </Typography>
          <Typography variant="inherit" color="primary">
            APR
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%
          </Typography>
          <Typography variant="inherit" color="primary">
            Daily APR
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
          </Typography>
          <Typography variant="inherit" color="primary">
            TVL
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {statsOnPool?.TVL}$
          </Typography>
          <Typography variant="inherit" color="primary">
            Reward
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {getDisplayBalance(earnings, bank.earnToken.decimal, 2)} CRS {`(${earnedInDollars}$)`}
          </Typography>
          <Typography variant="inherit" color="primary">
            Staked
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {getDisplayBalance(stakedBalance, bank.depositToken.decimal, 2)} {`${bank.depositTokenName}`} {`(${stakedInDollars}$)`}
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
