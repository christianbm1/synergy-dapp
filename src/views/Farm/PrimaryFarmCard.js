import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid, Divider, CardMedia } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import CRS_BUSD_LOGO from '../../assets/img/crs_busd_farm.png';
import CRS_BNB_LOGO from '../../assets/img/crs_bnb_farm.png';
import DIA_BUSD_LOGO from '../../assets/img/dia_busd_farm.png';
import DIA_BNB_LOGO from '../../assets/img/dia_bnb_farm.png';
import useStatsForPool from '../../hooks/useStatsForPool';
import PrimaryActionPanel from './components/PrimaryActionPanel';

const mediaBySymbol = {
  'CRYSTAL/BTCB': CRS_BUSD_LOGO,
  'CRYSTAL/DIAMOND': CRS_BNB_LOGO,
  'DIAMOND/CRYSTAL': DIA_BUSD_LOGO,
  'DIAMOND/BNB': DIA_BNB_LOGO,
};

const PrimaryFarmCard = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);
  const shadowStyle = 
    bank.depositTokenName.includes("CRYSTAL") 
      ? '0px 0px 5px 5px #062f5b' 
      : bank.depositTokenName.includes("DIAMOND") 
        ? '0px 0px 5px 5px #5a063a' 
        : '0px 0px 0px 0px transparent';

  return (
    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
      <Card
        style={{
          backgroundColor: '#000008',
          borderRadius: '20px',
          boxShadow: shadowStyle
        }}
      >
        <CardMedia
          component="img"
          image={mediaBySymbol[bank.depositTokenName]}
          alt="primary farm avatar"
          style={{ backgroundColor: '#00001e' }}
        />
        <CardContent>
          <Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Status</Typography>
              <Typography>Online</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Deposit</Typography>
              <Typography>{bank.depositTokenName}</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Earn</Typography>
              <Typography>DIAMOND</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Market cup</Typography>
              <Typography></Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Circulation Supply</Typography>
              <Typography></Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <Typography>Total Supply</Typography>
              <Typography></Typography>
            </Box>
          </Box>
          <Divider variant="middle" style={{ margin: '10px 0px 10px 0px', backgroundColor: 'grey' }} />
          <Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>TVL</Typography>
              <Typography>{statsOnPool?.TVL}$</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>APR</Typography>
              <Typography>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</Typography>
            </Box>
          </Box>
          <Divider variant="middle" style={{ margin: '10px 0px 0px 0px', backgroundColor: 'grey' }} />
        </CardContent>
        <CardActions style={{ padding: '0px 16px' }}>
          <PrimaryActionPanel bank={bank} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PrimaryFarmCard;
