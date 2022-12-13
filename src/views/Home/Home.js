import React, { useMemo } from 'react';
import Page from '../../components/Page';
import styled, { createGlobalStyle } from 'styled-components';
import { Box, Card, Container, Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import SynergyHomeTitle from '../../assets/img/home-title.png';
import VideoBG from '../../assets/img/background/main.mp4';
import { white } from '../../theme/colors';
import Triangle from '../../assets/img/triangle.png';

const StyledCard = styled(Card)`
  background-color: #4d32727d;
`;

const TITLE = 'Synergy';

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
  subtitle: {
    marginLeft: '5px', 
    marginRight: '5px', 
    textAlign: 'center',
    fontSize: '18px',
    [theme.breakpoints.down('430')]: {
      fontSize: '14px',
    },
  },
  video: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-30%',
    width: '100%',
    zIndex: -1,
    [theme.breakpoints.down('1450')]: {
      bottom: '-20%',
    },
    [theme.breakpoints.down('1000')]: {
      bottom: '-10%',
    },
    [theme.breakpoints.down('700')]: {
      bottom: '-5%',
    },
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {/* <BackgroundImage /> */}
      <Container maxWidth="lg">
        <video autoPlay muted loop className={classes.video}>
          <source src={VideoBG} type="video/mp4"/>
        </video>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={SynergyHomeTitle} alt="Synergy" style={{ maxHeight: '150px', maxWidth: '100%' }} />
          <Box
            style={{
              color: white,
              display: 'flex',
              marginTop: 30,
              flexDirection: 'row',
              alignItems: 'center',
              textTransform: 'uppercase',
            }}
          >
            <img src={Triangle} alt="Triangle" style={{ maxHeight: '30px' }} />
            <Typography className={classes.subtitle}>
              Without the real world application, cryptocurrency can't develop to its full potential
            </Typography>
            <img src={Triangle} alt="Triangle" style={{ maxHeight: '30px', transform: 'rotate(180deg)' }} />
          </Box>
        </Container>
        <Grid container spacing={6} style={{ marginTop: '40px', color: 'white' }}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '26px'}}>
              What Is Our Mission
            </Typography>
            <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '14px'}}>
              We want to bridge the gap between the cryptocurrency marke and everyday consumer. We'll bring it to the mainstream
              by removing barriers to access and by helping people trust and understand what we believe to be the future of money.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '26px'}}>
              Power Of Blockchain
            </Typography>
            <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '14px'}}>
              Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or 
              cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed
              across the entire network of computer systems on the blockchain.
            </Typography>          
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '26px'}}>
              Purpose Of Crypto
            </Typography>
            <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '14px'}}>
              Cryptocurrencies are a new paradigm for money. Their promise is to streamline existing financial architecture to make it
              faster and cheaper. Technology and architecture decentralize existing monetary systems make it possible for transacting
              parties to exchange value independently of intermediary institutions such as banks.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;
