import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TokenSymbol from '../../components/TokenSymbol';

const useStyles = makeStyles((theme) => ({
  stake: {
    fontSize: '1rem !important',
    minWidth: '48px !important',
    backgroundColor: '#232227 !important',
    color: 'white !important'
  },
  claim: {
    fontSize: '1rem !important',
    backgroundColor: '#232227 !important',
    color: 'white !important',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
}));

const PoolCard = ({bank}) => {
  const classes = useStyles();

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
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            <Typography variant="p" color="primary">
              GPool ROI
            </Typography>
            <Typography variant="p" color="textSecondary">
              14.71%
            </Typography>
            <Typography variant="p" color="primary">
              TVL
            </Typography>
            <Typography variant="p" color="textSecondary">
              24.245%
            </Typography>
            <Typography variant="p" color="primary">
              Your stake
            </Typography>
            <Typography variant="p" color="textSecondary">
              1.2 BNB (364$)
            </Typography>
            <Typography variant="p" color="primary">
              Reward
            </Typography>
            <Typography variant="p" color="textSecondary">
              14 CRS (82$)
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{justifyContent: 'space-between', padding: 0}}>
          <Button className={classes.stake} component={Link} to={`/farm/${bank.contract}`}>
            -
          </Button>
          <Button className={classes.claim} component={Link} to={`/farm/${bank.contract}`}>
            Claim
          </Button>
          <Button className={classes.stake} component={Link} to={`/farm/${bank.contract}`}>
            +
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PoolCard;
