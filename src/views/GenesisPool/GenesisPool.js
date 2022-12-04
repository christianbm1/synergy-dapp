import React, { useMemo } from 'react';
import Page from '../../components/Page';
import styled, { createGlobalStyle } from 'styled-components';
import { Box, Button, Card, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import PoolCard from './PoolCard';

import TitleImage from '../../assets/img/gpool-title.png';
import BGImage from '../../assets/img/background/gpool.png';
import Triangle from '../../assets/img/triangle.png';
import Character from '../../assets/img/gpool-avatar.png';
import Row from '../../components/Row';
import { white } from '../../theme/colors';
import useBanks from '../../hooks/useBanks';
import { useRouteMatch } from 'react-router-dom';
import useWallet from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGImage}) 100% 100% / cover no-repeat !important;
    background-position-x: 80% !important;
    background-position-y: top !important;
  }
`;

const TITLE = 'Synergy | Genesis Pools';

const useStyles = makeStyles((theme) => ({
    button: {
        [theme.breakpoints.down('415')]: {
            // marginTop: '10px'
        },
    },
}));

const Home = () => {
    const classes = useStyles();
    const [banks] = useBanks();
    const { path } = useRouteMatch();
    const { account } = useWallet();
    const activeBanks = banks.filter((bank) => !bank.finished);

    return (
        <Page>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <BackgroundImage />
            {!!account ? (
                <Container maxWidth="xl" style={{ paddingLeft: '100px' }}>
                    <Box>
                        <img src={TitleImage} alt="Genesis Pool" style={{ maxHeight: '70px' }} />
                        <Box
                            style={{
                                display: 'flex',
                                marginBottom: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <img src={Triangle} alt="Triangle" style={{ maxHeight: '30px' }} />
                            <Box
                                style={{
                                    color: white,
                                    marginLeft: 5,
                                }}
                            >
                                <Typography align="left">
                                    Deposit seleted tokens
                                </Typography>
                                <Typography align="left">
                                    and get CRYSTALS as reward
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box style={{ marginTop: '50px', maxWidth: "55%" }}>
                        <Typography variant="h4" align="left">
                            Ends in 121h 34m 6s
                        </Typography>
                        <Grid container spacing={3}>
                            {banks
                                .filter((bank) => bank.sectionInUI === 0)
                                .map((bank) => (
                                    <React.Fragment key={bank.name}>
                                        <PoolCard bank={bank} />
                                    </React.Fragment>
                                ))}
                        </Grid>
                        {/* <img src={Character} style={{position: 'absolute', width: "100%", bottom: '0'}}/> */}
                    </Box>

                </Container>
            ) : (
                <UnlockWallet />
            )}
        </Page>
    );
};

export default Home;
