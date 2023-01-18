import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import { Bank } from '../../../synergy-finance';
import useWallet from 'use-wallet';
import WalletProviderModal from '../../../components/WalletProviderModal';

interface StakeProps {
  bank: Bank;
}

const ActionPanel: React.FC<StakeProps> = ({ bank }) => {
  const { account } = useWallet();
  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);

  const { onStake } = useStake(bank);
  const { onReward } = useHarvest(bank);
  const { onWithdraw } = useWithdraw(bank);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  return (
    <StyledCardActions>
      {!account ? (
          <Button 
            onClick={handleWalletProviderOpen} 
            className="shinyButtonPrimary" 
            startIcon={<AccountBalanceWalletIcon />}
            style={{width: '-webkit-fill-available'}}
          >
            Connect
          </Button>
        ) : ((approveStatus !== ApprovalState.APPROVED) ? (
          <Button
            disabled={
              bank.closedForStaking ||
              approveStatus === ApprovalState.PENDING ||
              approveStatus === ApprovalState.UNKNOWN
            }
            onClick={approve}
            className={
              bank.closedForStaking ||
                approveStatus === ApprovalState.PENDING ||
                approveStatus === ApprovalState.UNKNOWN
                ? 'shinyButtonDisabled'
                : 'shinyButtonPrimary'
            }
            style={{width: '-webkit-fill-available'}}
          >
            {`Approve ${bank.depositTokenName}`}
          </Button>
        ) : (
          <>
            <Button className={'shinyButtonPrimary'} onClick={onPresentWithdraw}>
              -
            </Button>
            <Button
              onClick={onReward}
              disabled={earnings.eq(0)}
              className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButtonPrimary'}
            >
              Claim
            </Button>
            <Button
              className={'shinyButtonPrimary'}
              disabled={bank.closedForStaking}
              onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
            >
              +
            </Button>
          </>
        )
      )}
      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
    </StyledCardActions>
  );
};

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
	gap: 10px;
`;

export default ActionPanel;
