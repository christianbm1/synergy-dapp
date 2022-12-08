import React, { useMemo } from 'react';
import { Box, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';
import ActionPanel from './components/ActionPanel';
import useWallet from 'use-wallet';
import useStakedBalance from '../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import { getDisplayBalance } from '../../utils/formatBalance';
import useEarnings from '../../hooks/useEarnings';
import useCrystalStats from '../../hooks/useCrystalStats';

const PoolCard = ({ bank }) => {
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
    <Grid item sm={12} md={6} lg={4} xl={3}>
      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <TokenSymbol size={64} symbol={bank.depositTokenName} />
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
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between', padding: 0 }}>
          <ActionPanel bank={bank} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PoolCard;
