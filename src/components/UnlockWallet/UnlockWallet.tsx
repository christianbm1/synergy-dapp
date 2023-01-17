import React from 'react';
import { Box } from '@material-ui/core';
import AccountButton from '../Nav/AccountButton';

import AvatarImage from '../../assets/img/connect-avatar.png';

const UnlockWallet = () => {
  return (
    <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {/* <img src={AvatarImage} width={55} style={{ position: 'absolute', right: '-15%', top: '-110%', zIndex: 1 }} /> */}
      <AccountButton />
      {/* <Button color="primary" variant="contained" onClick={() => connect('injected')}>Unlock Wallet</Button> */}
    </Box>
  );
};

export default UnlockWallet;
