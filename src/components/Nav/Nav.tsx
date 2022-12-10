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

import ListItemLink from '../ListItemLink';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { ClickAwayListener } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';

import synergyLogo from '../../assets/img/logo.png';
import { roundAndFormatNumber } from '../../0x';
//import TokenSymbol from '../TokenSymbol';

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
    color: '#f9d749',
    'background-color': 'transparent',
    padding: '10px',
    marginBottom: '3rem',
    position: 'static',
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
  },
  toolbarTitle: {
    fontFamily: 'Rubik',
    fontSize: '0px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: '#f9d749',
    fontSize: '24px',
    marginTop: '15px',
    margin: theme.spacing(10, 1, 1, 1),
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
    fontSize: '24px',
    marginTop: '15px',
    margin: theme.spacing(10, 2, 1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    cursor: 'pointer'
  },
  socialLink: {
    margin: '6px 4px 4px 4px',
    textDecoration: 'none',
  },
  brandLink: {
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
    backgroundColor: '#000000a1',
    border: '1px solid grey',
  },
  menuItem: {
    '&:hover a': {
      color: 'black'
    },
    borderBottom: '1px solid grey',
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
            <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: '0' }} className={classes.toolbarTitle}>
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img alt="Synergy" src={synergyLogo} height="60px" />
              </Link>
            </Typography>
            <Box style={{ paddingLeft: '30px', fontSize: '1rem', flexGrow: '1', display: 'flex', alignItems: 'center' }}>
              <Link to="/gpool" className={'navLink ' + classes.link}>
                Genesis Pools
              </Link>
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
            <Box
              style={{
                flexGrow: '0',
                paddingLeft: '15px',
                fontSize: '1rem',
                paddingRight: '15px',
                display: 'flex',
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
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <img
              alt="Synergy"
              src={synergyLogo}
              style={{ height: '40px', marginTop: '-10px', marginLeft: '10px', marginRight: '15px' }}
            />
            <AccountButton text="Connect" />
            <Drawer
              className={classes.drawer}
              onClose={handleDrawerClose}
              // onEscapeKeyDown={handleDrawerClose}
              // onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon htmlColor="white" />
                  ) : (
                    <ChevronLeftIcon htmlColor="white" />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem>
                  <AccountButton text="Connect" />
                </ListItem>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Genesis Pools" to="/gpool" />
                <ListItemLink primary="Farm" to="/farm" />
                <ListItemLink primary="ARK" to="/boardroom" />
                <ListItemLink primary="Lottery" to="/" />
                <ListItemLink primary="NFT" to="/" />
                <ListItemLink primary="Portofolio" to="/" />
                <ListItem button component="a" href="https://">
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
