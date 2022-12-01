import React, { useMemo } from 'react';
import Page from '../../components/Page';
import styled, { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import usePushStats from '../../hooks/usePushStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usepShareStats from '../../hooks/usepShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Push as pushTesting } from '../../push-finance/deployments/deployments.testing.json';
import { Push as pushProd } from '../../push-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import usePushFinance from '../../hooks/usePushFinance';
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
  video: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-30%',
    minWidth: '100%',
    zIndex: -1,
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
        <img src={SynergyHomeTitle} alt="Synergy" style={{ maxHeight: '150px' }} />
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
          <Typography style={{marginLeft: '5px', marginRight: '5px', fontSize: '18px'}}>
            Without the real world application, cryptocurrency can't develop to its full potential
          </Typography>
          <img src={Triangle} alt="Triangle" style={{ maxHeight: '30px', transform: 'rotate(180deg)' }} />
        </Box>
      </Container>
      <Grid container spacing={6} style={{ marginTop: '40px', color: 'white' }}>
        <Grid item xs={12} md={4} lg={4}>
          <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '30px'}}>
            What Is Our Mission
          </Typography>
          <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '14px'}}>
            We want to bridge the gap between the cryptocurrency marke and everyday consumer. We'll bring it to the mainstream
            by removing barriers to access and by helping people trust and understand what we believe to be the future of money.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '30px'}}>
            Power Of Blockchain
          </Typography>
          <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '14px'}}>
            Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or 
            cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed
            across the entire network of computer systems on the blockchain.
          </Typography>          
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '30px'}}>
            Purpose Of Crypto
          </Typography>
          <Typography align="left" style={{marginLeft: '10px', marginRight: '10px', fontSize: '14px'}}>
            Cryptocurrencies are a new paradigm for money. Their promise is to streamline existing financial architecture to make it
            faster and cheaper. Technology and architecture decentralize existing monetary systems make it possible for transacting
            parties to exchange value independently of intermediary institutions such as banks.
          </Typography>
        </Grid>
      </Grid>
      {/* <Box
        component="img"
        alt="Hero Image"
        sx={{
          width: '50%',
          maxWidth: 500,
        }}
        src={HeroImageURL}
        style={{
          position: 'absolute',
          left: '40%',
          bottom: 30,
        }}
      /> */}
    </Page>
  );
};

export default Home;
