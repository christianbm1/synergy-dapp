import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid, CardHeader, CardMedia} from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import CRS_BUSD from '../../assets/img/crs_busd_farm.png';

const PrimaryFarmCard = ({bank}) => {
  return (
    <Grid item xs={12} md={4} lg={4} xl={3}>
      <Card>
        <CardMedia
          component="img"
          width="100%"
          image={CRS_BUSD}
          alt="green iguana"
        />
        <CardContent>
          <Box style={{position: 'relative'}}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: '#363746',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={32} symbol={bank.depositTokenName} />
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            <Typography color="textSecondary">
              {/* {bank.name} */}
              Deposit {bank.depositTokenName.toUpperCase()} Earn {` ${bank.earnTokenName}`}
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{justifyContent: 'flex-end'}}>
          <Button className="shinyButtonSecondary" component={Link} to={`/farm/${bank.contract}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PrimaryFarmCard;
