import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {useWallet} from 'use-wallet';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';
import Davatar from '@davatar/react';

function shorten(str: string) {
  if (str.length < 10) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

interface AccountButtonProps {
  text?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({text}) => {
  const {account} = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);
  // const {ensName} = useENS(account);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Connect';

  return (
    <div>
      {!account ? (
        <Button 
          onClick={handleWalletProviderOpen} 
          className="shinyButtonPrimary" 
          startIcon={<AccountBalanceWalletIcon />}
          style={{height: '42px'}}
        >
          {buttonText}
        </Button>
      ) : (
        <Button onClick={onPresentAccountModal} className="shinyButtonSecondary" style={{height: '42px', paddingLeft: '10px', paddingRight: '10px'}}>
          <div className="account">
            {/* <Davatar size={20} address={account} /> */}
            <span>{shorten(account)}</span>
          </div>
        </Button>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
