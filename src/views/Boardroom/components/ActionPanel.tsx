import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import useModal from '../../../hooks/useModal';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useSynergyFinance from '../../../hooks/useSynergyFinance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerBoardroom from '../../../hooks/boardroom/useUnstakeTimerBoardroom';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useCrystalStats from '../../../hooks/useCrystalStats';
import useClaimRewardTimerBoardroom from '../../../hooks/boardroom/useClaimRewardTimerBoardroom';

import { getDisplayBalance } from '../../../utils/formatBalance';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import ProgressCountdown from './ProgressCountdown';
import WalletProviderModal from '../../../components/WalletProviderModal';

const ActionPanel: React.FC = () => {
  const small = useMediaQuery('(max-width:425px)');
  const synergyFinance = useSynergyFinance();
  const { account } = useWallet();
  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);
  const [approveStatus, approve] = useApprove(synergyFinance.DIA, synergyFinance.contracts.Boardroom.address);

  const tokenBalance = useTokenBalance(synergyFinance.DIA);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const { from: withdrawFrom, to: withdrawTo } = useUnstakeTimerBoardroom();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('DIA', synergyFinance.DIA);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  const stakedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, 18))
  ).toFixed(2);

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();
  const canWithdrawFromBoardroom = useWithdrawCheck();

  const crsStats = useCrystalStats();
  const { onReward } = useHarvestFromBoardroom();
  const earnings = useEarningsOnBoardroom();
  const canClaimReward = useClaimRewardCheck();

  const crsPriceInDollars = useMemo(
    () => (crsStats ? Number(crsStats.priceInDollars).toFixed(2) : null),
    [crsStats],
  );

  const earnedInDollars = (Number(crsPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { from: claimFrom, to: claimTo } = useClaimRewardTimerBoardroom();

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'PShare'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'PShare'}
    />,
  );

  return (
    <StyledContainer>
      <StyledCardContentInner>
        <StyledRow>
          <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px' }}>Reward:</Typography>
          <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px', color: '#21E786' }}>
            {getDisplayBalance(earnings, 18, 2)} CRS {`(${earnedInDollars}$)`}
          </Typography>
        </StyledRow>
        <StyledRow>
          <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px' }}>Claim:</Typography>
          <Box style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px', color: '#21E786' }}>
            <ProgressCountdown 
              hideBar={true} 
              base={claimFrom} 
              deadline={claimTo} 
              description="Claim available in" 
              fontSize={small ? '16px' : '24px'}
            />
          </Box>
        </StyledRow>
        <StyledRow>
          <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px' }}>Withdraw:</Typography>
          <Box style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px', color: '#21E786' }}>
            <ProgressCountdown 
              hideBar={true} 
              base={withdrawFrom} 
              deadline={withdrawTo} 
              description="Withdraw available in" 
              fontSize={small ? '16px' : '24px'}
            />
          </Box>
        </StyledRow>
        <StyledRow>
          <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px' }}>Staking:</Typography>
          <Typography style={{ fontFamily: 'Poppins', fontSize: small ? '16px' : '24px', color: '#21E786' }}>
            {getDisplayBalance(stakedBalance, 18, 2)} DIA {`(${stakedInDollars}$)`}
          </Typography>
        </StyledRow>
      </StyledCardContentInner>
      <StyledCardActions>
        {!account ? (
          <Button
            onClick={handleWalletProviderOpen}
            className="shinyButtonPrimary"
            startIcon={<AccountBalanceWalletIcon />}
            style={{ width: '-webkit-fill-available' }}
          >
            Connect
          </Button>
        ) : (approveStatus !== ApprovalState.APPROVED) ? (
          <Button
            disabled={approveStatus !== ApprovalState.NOT_APPROVED}
            className={approveStatus === ApprovalState.NOT_APPROVED ? 'shinyButtonPrimary' : 'shinyButtonDisabled'}
            style={{ width: '-webkit-fill-available' }}
            onClick={approve}
          >
            Approve DIAMOND
          </Button>
        ) : (
          <Box style={{ display: 'flex', flexDirection: 'column', width: '-webkit-fill-available', gap: '10px' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
              <Button
                className={'shinyButtonPrimary'}
                onClick={onPresentDeposit}
                style={{ width: '-webkit-fill-available' }}
              >
                Deposit
              </Button>
              <Button
                className={!canWithdrawFromBoardroom ? 'shinyButtonDisabled' : 'shinyButtonPrimary'}
                disabled={!canWithdrawFromBoardroom}
                onClick={onPresentWithdraw}
                style={{ width: '-webkit-fill-available' }}
              >
                Withdraw
              </Button>
            </Box>
            <Button
              className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButtonPrimary'}
              disabled={earnings.eq(0) || !canClaimReward}
              onClick={onReward}
              fullWidth
            >
              Claim
            </Button>
          </Box>
        )}
      </StyledCardActions>
      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
    </StyledContainer>
  );
};

const StyledCardActions = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;
	gap: 10px;
`;

const StyledCardContentInner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 30px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
	flex-direction: column;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
`;

const StyledTokenSymbolContainer = styled.div`
  display: flex;
  margin: -10px 20px 0px 10px;
`

export default ActionPanel;
