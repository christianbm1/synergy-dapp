import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

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

interface StakeProps {
  bank: Bank;
}

const ActionPanel: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);

  const { onStake } = useStake(bank);
  const { onReward } = useHarvest(bank);
  const { onWithdraw } = useWithdraw(bank);

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
      {approveStatus !== ApprovalState.APPROVED ? (
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
              : 'shinyButton'
          }
          style={{width: '-webkit-fill-available'}}
        >
          {`Approve ${bank.depositTokenName}`}
        </Button>
      ) : (
        <>
          <Button className={'shinyButton'} onClick={onPresentWithdraw}>
            -
          </Button>
          <Button
            onClick={onReward}
            disabled={earnings.eq(0)}
            className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
          >
            Claim
          </Button>
          <Button
            className={'shinyButton'}
            disabled={bank.closedForStaking}
            onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
          >
            +
          </Button>
        </>
      )}
    </StyledCardActions>
  );
};

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export default ActionPanel;
