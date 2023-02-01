import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Link, Box } from '@material-ui/core';

import IconTelegram from '../../assets/img/telegram.png';
import IconTwitter from '../../assets/img/twitter.png';
import IconDiscord from '../../assets/img/discord.png';
import IconReddit from '../../assets/img/reddit.png';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    height: '300px',
    width: '100%',
    color: 'white',

    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
  },
  text: {
    color: '#C2C3C5',
    fontFamily: 'Poppins',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',

    [theme.breakpoints.down('430')]: {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    marginLeft: '20px',
  },

  img: {
    width: '24px',
    height: '24px',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '30px' }}>
        <Box className={classes.social}>
          <a
            href="https://www.reddit.com/r/SynergyCOFP/"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.socialLink}
          >
            <img alt="Reddit" src={IconReddit} height="45px" />
          </a>
          <a
            href="https://t.me/SynergyCOFP"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.socialLink}
          >
            <img alt="Telegram" src={IconTelegram} height="45px" />
          </a>
          <a
            href="https://discord.gg/nczxGjeTSv"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.socialLink}
          >
            <img alt="Discord" src={IconDiscord} height="45px" />
          </a>
          <a
            href="https://twitter.com/SynergyCOFP"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.socialLink}
          >
            <img alt="Twitter" src={IconTwitter} height="45px" />
          </a>
        </Box>
        <Typography className={classes.text}>
          <span style={{ color: '#21E786' }}>synergy</span> All rights reserved 2023
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
