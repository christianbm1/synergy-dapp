import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box, Button, Typography } from '@material-ui/core';
import FlashOnIcon from '@material-ui/icons/FlashOn';

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
import TokenSymbol from '../../../components/TokenSymbol';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useStakedBalance from '../../../hooks/useStakedBalance';
import { Bank } from '../../../synergy-finance';
import useStake from '../../../hooks/useStake';
import useZap from '../../../hooks/useZap';
import useWithdraw from '../../../hooks/useWithdraw';
import ZapModal from './ZapModal';
import useEarnings from '../../../hooks/useEarnings';
import useDiamondStats from '../../../hooks/useDiamondStats';
import useHarvest from '../../../hooks/useHarvest';
import IconButton from '../../../components/IconButton';

interface PanelProps {
  bank: Bank;
}

const PrimaryActionPanel: React.FC<PanelProps> = ({ bank }) => {
  const { color: themeColor } = useContext(ThemeContext);
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const stakedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
  ).toFixed(2);

  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const diaStats = useDiamondStats();
  const diaPriceInDollars = useMemo(
    () => (diaStats ? Number(diaStats.priceInDollars).toFixed(2) : null),
    [diaStats],
  );
  const earnedInDollars = (Number(diaPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { onStake } = useStake(bank);
  const { onZap } = useZap(bank);
  const { onWithdraw } = useWithdraw(bank);
  const { onReward } = useHarvest(bank);


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

  const [onPresentZap, onDissmissZap] = useModal(
    <ZapModal
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZap(zappingToken, tokenName, amount);
        onDissmissZap();
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
    <StyledContainer>
      <StyledCardContentInner>
        <Box style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{bank.depositTokenName} Staked:</Typography>
            <Typography>
              {getDisplayBalance(stakedBalance, 18, 2)} {`(${stakedInDollars}$)`}
            </Typography>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>DIAMOND Earned:</Typography>
            <Typography>
              {getDisplayBalance(earnings, 18, 2)} {`(${earnedInDollars}$)`}
            </Typography>
          </Box>
        </Box>
      </StyledCardContentInner>
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
            style={{ width: '-webkit-fill-available' }}
          >
            {`Approve ${bank.depositTokenName}`}
          </Button>
        ) : (
          <>
            <Button
              className={'shinyButton'}
              onClick={onPresentWithdraw}
            >
              -
            </Button>
            <Button
              className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
              disabled={earnings.eq(0)}
              onClick={onReward}
              fullWidth
            >
              Claim
            </Button>
            <Button
              disabled={
                bank.closedForStaking ||
                bank.depositTokenName === 'CRYSTAL/DIAMOND' ||
                bank.depositTokenName === 'CRYSTAL/BTCB'
              }
              className={
                bank.closedForStaking ||
                bank.depositTokenName === 'CRYSTAL/DIAMOND' ||
                bank.depositTokenName === 'CRYSTAL/BTCB'
                  ? 'shinyButtonDisabled'
                  : 'shinyButton'
              }
              onClick={() => (bank.closedForStaking ? null : onPresentZap())}
            >
              <FlashOnIcon style={{ color: themeColor.grey[400],  }} />
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
	justify-content: space-between;
	margin-bottom: 30px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
	flex-direction: column;
  justify-content: space-between;
`;

export default PrimaryActionPanel;