import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, makeStyles, Card, CardActions, CardContent, Typography, Grid, Divider, CardMedia } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';
import PrimaryActionPanel from './components/PrimaryActionPanel';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    background: '#141B22',
    position: 'relative',
  },
  header: {
    display: 'flex',
    width: '-webkit-fill-available',
    justifyContent: 'center',
    padding: '12px',
    position: 'absolute',
    marginTop: '-70px',
    gap: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '60px 24px 0px 24px',
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
    padding: '0px 24px 12px 24px',
  },
  divider: {
    // margin: '0px 30px 20px', 
    background: 'white', 
    opacity: '0.2',

    [theme.breakpoints.down('450')]: {
      margin: '0px 15px 10px', 
    },
  },
}));

const PrimaryFarmCard = ({ bank }) => {
  const classes = useStyles();
  const statsOnPool = useStatsForPool(bank);
  const tokenList = bank.depositTokenName.split("/");

  return (
    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
      <Box className={classes.cardContainer}>
        <Box className={classes.header}>
          <TokenSymbol size={110} symbol={tokenList[0]} />
          <TokenSymbol size={110} symbol={tokenList[1]} />
        </Box>
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
        <Box className={classes.content}>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Status
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              Online
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Deposit
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {bank.depositTokenName}
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Earn
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              DIAMOND
            </Typography>
          </Box>
          {/* <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Market cap
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              0
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Circulation Supply
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              0
            </Typography>
          </Box>
          <Box className={classes.row}>
            <Typography style={{ fontSize: '18px', color: '#21E786', fontFamily: 'Poppins' }}>
              Total Supply
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              0
            </Typography>
          </Box> */}
          <Divider className={classes.divider} />
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
              APR
            </Typography>
            <Typography style={{ fontSize: '18px', fontFamily: 'Poppins' }}>
              {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%
            </Typography>
          </Box>
          <Divider className={classes.divider} />
        </Box>
        <Box className={classes.action}>
          <PrimaryActionPanel bank={bank} />
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

export default PrimaryFarmCard;
