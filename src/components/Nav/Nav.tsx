import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Popper,
  Grow,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import { Link as ExternalLink} from '@material-ui/core';

import ListItemLink from '../ListItemLink';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { ClickAwayListener } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';

import synergyLogo from '../../assets/img/logo.png';
import IconTelegram from '../../assets/img/telegram.png';
import IconTwitter from '../../assets/img/twitter.png';
import IconDiscord from '../../assets/img/discord.png';
import IconReddit from '../../assets/img/reddit.png';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    backgroundColor: 'transparent',
    maxWidth: '1440px',
    padding: '10px',
    position: 'absolute',
    left: '0',
    right: '0',
    'margin-left': 'auto',
    'margin-right': 'auto',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
    },
  },
  toolbarTitle: {
    fontFamily: 'Bakbak One',
    color: 'white',
    fontSize: '32px',
    fontWeight: 400,
    lineHeight: '42px',
  },
  link: {
    textTransform: 'uppercase',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.1em',
    marginTop: '15px',
    margin: '80px 14px 8px 14px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  more: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: '#f9d749',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.1em',
    marginTop: '15px',
    margin: '80px 14px 8px 14px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    cursor: 'pointer'
  },
  socialLink: {
    margin: '6px 8px 4px 0px',
    textDecoration: 'none',
  },
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: '#f9d749',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  linkDropDown: {
    color: 'white',
    fontSize: '14px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: 'black'
    },
  },
  linkDropPanel: {
    backgroundColor: '#141B22',
    // border: '1px solid grey',
  },
  menuItem: {
    '&:hover a': {
      color: 'black'
    },
    // borderBottom: '1px solid grey',
  }
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen1((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen1(false);
  };

  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Link to="/" color="inherit" className={classes.brandLink}>
              <img alt="Synergy" src={synergyLogo} width="36px" height="40px"/>
              <Typography variant="h6" color="inherit" noWrap  className={classes.toolbarTitle}>
                SYNERGY
              </Typography>
            </Link>
            <Box style={{ fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
              <ExternalLink 
                className={'navLink ' + classes.link}
                href="https://synergy-2.gitbook.io/the-book-of-synergy/"
                target='_blank'
              >
                Doc
              </ExternalLink>
              {/* <Link to="/gpool" className={'navLink ' + classes.link}>
                Genesis Pools
              </Link> */}
              <Link to="/farm" className={'navLink ' + classes.link}>
                Farm
              </Link>
              <Link to="/boardroom" className={'navLink ' + classes.link}>
                ARK
              </Link>
              <div className="nav-dropdown">
                <Typography
                  id="composition-button1"
                  aria-controls={open1 ? 'composition-menu1' : undefined}
                  aria-expanded={open1 ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={'navLink ' + classes.more}
                >
                  More <KeyboardArrowDownIcon />
                </Typography>
                <Popper
                  open={open1}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  style={{ top: "auto", left: "auto", marginLeft: '15px' }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <div className={classes.linkDropPanel}>
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <MenuList
                            autoFocusItem={open1}
                            id="composition-menu1"
                            aria-labelledby="composition-button1"
                            style={{padding: '0'}}
                          >
                            <MenuItem onClick={handleClick} className={classes.menuItem}>
                              <ExternalLink
                                style={{ fontSize: '18px' }}
                                color="textPrimary"
                                href="https://www.cryptolids.com/synergy-merch"
                                target="_blank"
                                className={classes.linkDropDown}
                              >
                                Merch
                              </ExternalLink>
                            </MenuItem>
                            <MenuItem onClick={handleClick} className={classes.menuItem}>
                              <NavLink
                                style={{ fontSize: '18px' }}
                                color="textPrimary"
                                to="/"
                                className={classes.linkDropDown}
                                activeClassName="active"
                              >
                                Lottery
                              </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClick} className={classes.menuItem}>
                              <NavLink
                                style={{ fontSize: '18px' }}
                                color="textPrimary"
                                to="/"
                                className={classes.linkDropDown}
                                activeClassName="active"
                              >
                                NFT
                              </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClick} className={classes.menuItem}>
                              <NavLink
                                style={{ fontSize: '18px' }}
                                color="textPrimary"
                                to="/"
                                className={classes.linkDropDown}
                                activeClassName="active"
                              >
                                Portfolio
                              </NavLink>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </div>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Box>
            <AccountButton text="Connect"/>
          </>
        ) : (
          <>
            <img
              alt="Synergy"
              src={synergyLogo}
              style={{ height: '40px', marginLeft: '10px', marginRight: '15px' }}
            />
            <Box style={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
              <AccountButton text="Connect" />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              className={classes.drawer}
              onClose={handleDrawerClose}
              // onEscapeKeyDown={handleDrawerClose}
              // onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="right"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {/* <div>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronRightIcon htmlColor="white" />
                </IconButton>
              </div> */}
              <Divider />
              <List>
                <ListItem>
                  <AccountButton text="Connect" />
                </ListItem>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Farm" to="/farm" />
                <ListItemLink primary="ARK" to="/boardroom" />
                <ListItem button component="a" href="https://www.cryptolids.com/synergy-merch" target="_blank">
                  <ListItemText>Merch</ListItemText>
                </ListItem>
                <ListItemLink primary="Lottery" to="/" />
                <ListItemLink primary="NFT" to="/" />
                <ListItemLink primary="Portofolio" to="/" />
                <ListItemLink primary="Merch" to="/" />
                <ListItem button component="a" href="https://synergy-2.gitbook.io/the-book-of-synergy/" target="_blank">
                  <ListItemText>Documentation</ListItemText>
                </ListItem>
              </List>
              <Box
                style={{
                  flexGrow: '0',
                  paddingLeft: '15px',
                  fontSize: '1rem',
                  paddingRight: '15px',
                  display: 'flex',
                  marginTop: 'auto',
                }}
              >
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
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
