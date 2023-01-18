import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { Button, Typography } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import useCrystalStats from '../../../hooks/useCrystalStats';
import WalletProviderModal from '../../../components/WalletProviderModal';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { Bank } from '../../../synergy-finance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

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
  const crsStats = useCrystalStats();
  const enarTokenPriceInDollars = useMemo(
    () => (crsStats ? Number(crsStats.priceInDollars).toFixed(2) : null),
    [crsStats],
  );
  const earnedInDollars = (Number(enarTokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

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
      <ClaimReward>
        <Typography style={{ fontSize: '36px', opacity: '0.5' }}>
          {getDisplayBalance(earnings, bank.earnToken.decimal, 2)}
        </Typography>
        <Button
          onClick={onReward}
          disabled={earnings.eq(0)}
          className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButtonPrimary'}
        >
          Claim
        </Button>
      </ClaimReward>
      <StakeContainer>
        {!account ? (
          <Button 
            onClick={handleWalletProviderOpen} 
            className="shinyButtonPrimary" 
            startIcon={<AccountBalanceWalletIcon />}
            style={{width: '-webkit-fill-available'}}
          >
            Connect
          </Button>
        ) : ( approveStatus !== ApprovalState.APPROVED) ? (
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
              <Button
                className={'shinyButtonPrimary'}
                disabled={bank.closedForStaking}
                onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
                style={{width: '-webkit-fill-available'}}
              >
                Deposit
              </Button>
              <Button 
                onClick={onPresentWithdraw}
                disabled={stakedBalance.eq(0)}
                className={stakedBalance.eq(0) ? 'shinyButtonDisabled' : 'shinyButtonPrimary'}
                style={{width: '-webkit-fill-available'}}
              >
                Withdraw
              </Button>
            </>
          )}
      </StakeContainer>
      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
    </StyledCardActions>
  );
};

const StyledCardActions = styled.div`
  display: flex;
  flex-direction: column;
	gap: 20px;
`;

const ClaimReward = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StakeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export default ActionPanel;
