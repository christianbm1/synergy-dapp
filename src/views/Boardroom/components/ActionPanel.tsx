import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Button, Typography } from '@material-ui/core';

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
import ProgressCountdown from './ProgressCountdown';

const ActionPanel: React.FC = () => {
	const synergyFinance = useSynergyFinance();
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
				<Box style={{ padding: '0px 5px', flexGrow: 1 }}>
					<Box style={{ display: 'flex', justifyContent: 'space-start' }}>
						<Typography style={{ width: 100 }}>Reward:</Typography>
						<Typography style={{ color: '#f9d749' }}>
							{getDisplayBalance(earnings, 18, 2)} CRS {`(${earnedInDollars}$)`}
						</Typography>
					</Box>
					<Box style={{ display: 'flex', justifyContent: 'space-start' }}>
						<Typography style={{ width: 100 }}>Claim:</Typography>
						<Typography style={{ color: '#f9d749' }}>
							<ProgressCountdown hideBar={true} base={claimFrom} deadline={claimTo} description="Claim available in" fontSize='16px' />
						</Typography>
					</Box>
					<Box style={{ display: 'flex', justifyContent: 'space-start' }}>
						<Typography style={{ width: 100 }}>Withdraw:</Typography>
						<Typography style={{ color: '#f9d749', fontSize: '20px!important' }}>
							<ProgressCountdown hideBar={true} base={withdrawFrom} deadline={withdrawTo} description="Withdraw available in" fontSize='16px' />
						</Typography>
					</Box>
					<Box style={{ display: 'flex', justifyContent: 'space-start' }}>
						<Typography style={{ width: 100 }}>Staking:</Typography>
						<Typography style={{ color: '#f9d749' }}>
							{getDisplayBalance(stakedBalance, 18, 2)} DIA {`(${stakedInDollars}$)`}
						</Typography>
					</Box>
				</Box>
				<Box style={{ margin: '-10px 20px 0px 10px' }}>
					<TokenSymbol symbol="CRS" />
				</Box>
			</StyledCardContentInner>
			<StyledCardActions>
				{approveStatus !== ApprovalState.APPROVED ? (
					<Button
						disabled={approveStatus !== ApprovalState.NOT_APPROVED}
						className={approveStatus === ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
						style={{ width: '-webkit-fill-available' }}
						onClick={approve}
					>
						Approve DIAMOND
					</Button>
				) : (
					<>
						<Button
							className={'shinyButton'}
							disabled={!canWithdrawFromBoardroom}
							onClick={onPresentWithdraw}
						>
							-
						</Button>
						<Button
							className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
							disabled={earnings.eq(0) || !canClaimReward}
							onClick={onReward}
							fullWidth
						>
							Claim
						</Button>
						<Button
							className={'shinyButton'}
							onClick={onPresentDeposit}
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
	flex: 1;
	justify-content: space-between;
	margin-bottom: 30px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
	flex-direction: column;
  justify-content: space-between;
`;

export default ActionPanel;
