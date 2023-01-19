import React, { useState, useMemo } from 'react';

import { Button, Select, MenuItem, InputLabel, withStyles, Typography, makeStyles } from '@material-ui/core';
// import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import styled from 'styled-components';

import { getDisplayBalance } from '../../../utils/formatBalance';
import Label from '../../../components/Label';
import useLpStats from '../../../hooks/useLpStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useSynergyFinance from '../../../hooks/useSynergyFinance';
import { useWallet } from 'use-wallet';
import useApproveZapper, { ApprovalState } from '../../../hooks/useApproveZapper';
import { Alert } from '@material-ui/lab';
import { BigNumber } from 'ethers';

interface ZapProps extends ModalProps {
  onConfirm: (zapAsset: string, lpName: string, amount: string) => void;
  tokenName?: string;
  decimals?: number;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    fill: 'white',
  },
}));

const ZapModal: React.FC<ZapProps> = ({ onConfirm, onDismiss, tokenName, decimals = 18 }) => {
  const classes = useStyles();
  const synergyFinance = useSynergyFinance();
  const tokenList = tokenName.split("/");
  console.log('debug / ZapModal / tokens : ', synergyFinance.externalTokens);
  const { balance } = useWallet();
  const bnbBalance = (Number(balance) / 1e18).toFixed(4).toString();
  const token0Balance = useTokenBalance(synergyFinance.externalTokens[tokenList[0]]);
  const token1Temp = tokenList[1] === 'BNB' ? synergyFinance.externalTokens["BUSD"] : synergyFinance.externalTokens[tokenList[1]];
  const token1BalanceTemp = useTokenBalance(token1Temp);
  const token1Balance = tokenList[1] === 'BNB' ? BigNumber.from(balance) : token1BalanceTemp;
  console.log('debug / ZapModal / balances : ', [token0Balance.toString(), token1Balance.toString()]);
  const [val, setVal] = useState('');
  const [zappingToken, setZappingToken] = useState(tokenList[0]);
  const [zappingTokenBalance, setZappingTokenBalance] = useState(bnbBalance);
  const [estimate, setEstimate] = useState({ token0: '0', token1: '0' }); // token0 will always be BNB in this case
  const [approveZapperStatus, approveZapper] = useApproveZapper(zappingToken);
  console.log('debug / ZapModal / approve : ', approveZapperStatus);
  const lpStatsCand = useLpStats(tokenName);
  const lpStats = useMemo(() => (lpStatsCand ? lpStatsCand : null), [lpStatsCand]);
  const ftmAmountPerLP = lpStats?.ftmAmount;

  console.log('debug / ZapModal / estimates : ', [estimate.token0, estimate.token1])
  console.log('debug / ZapModal / ftmAmountPerLP : ', ftmAmountPerLP)
  /**
   * Checks if a value is a valid number or not
   * @param n is the value to be evaluated for a number
   * @returns
   */
  function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const handleChangeAsset = (event: any) => {
    const value = event.target.value;
    setZappingToken(value);
    setZappingTokenBalance(bnbBalance);

    if (event.target.value === tokenList[0]) {
      setZappingTokenBalance(getDisplayBalance(token0Balance, decimals));
    } else if (event.target.value === tokenList[1]) {
      setZappingTokenBalance(getDisplayBalance(token1Balance, decimals));
    }
  };

  const handleChange = async (e: any) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setVal(e.currentTarget.value);
      setEstimate({ token0: '0', token1: '0' });
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setVal(e.currentTarget.value);
    console.log('debug / ZapModal : ', [zappingToken, tokenName, String(e.currentTarget.value)])
    const estimateZap = await synergyFinance.estimateZapIn(zappingToken, tokenName, String(e.currentTarget.value));
    setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() });
  };

  const handleSelectMax = async () => {
    setVal(zappingTokenBalance);
    const estimateZap = await synergyFinance.estimateZapIn(zappingToken, tokenName, String(zappingTokenBalance));
    setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() });
  };

  return (
    <Modal>
      <ModalTitle text={`Zap in ${tokenName}`} />
      <InputLabel style={{ fontSize: '20px' }} id="label">
        Select asset to zap with
      </InputLabel>
      <Select
        onChange={handleChangeAsset}
        style={{ color: '#C2C3C5', height: '40px', marginTop: '10px' }}
        labelId="label"
        id="select"
        value={zappingToken}
        inputProps={{
          classes: {
            icon: classes.icon
          }
        }}
      >
        <StyledMenuItem value={tokenList[0]}>{tokenList[0]}</StyledMenuItem>
        <StyledMenuItem value={tokenList[1]}>{tokenList[1]}</StyledMenuItem>
      </Select>
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={zappingTokenBalance}
        symbol={zappingToken}
      />
      <Typography style={{ fontSize: '20px' }}>
        Zap Estimations
      </Typography>
      <StyledDescriptionText>
        {' '}
        {tokenName}: {Number(estimate.token0) / Number(ftmAmountPerLP)}
      </StyledDescriptionText>
      <StyledDescriptionText>
        {' '}
        ({Number(estimate.token0)} ${tokenList[0]} /{' '}
        {Number(estimate.token1)} ${tokenList[1]}){' '}
      </StyledDescriptionText>
      <ModalActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            approveZapperStatus !== ApprovalState.APPROVED ? approveZapper() : onConfirm(zappingToken, tokenName, val)
          }
        >
          {approveZapperStatus !== ApprovalState.APPROVED ? 'Approve' : "ZAP"}
        </Button>
      </ModalActions>

      <StyledActionSpacer />
      <Alert variant="filled" severity="info">
        New feature. Use at your own risk!
      </Alert>
    </Modal>
  );
};

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDescriptionText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 22px;
  justify-content: flex-start;
`;

const StyledMenuItem = withStyles({
  root: {
    backgroundColor: 'white',
    color: '#C2C3C5',
    '&:hover': {
      backgroundColor: 'grey !important',
      color: '#C2C3C5',
    },
    selected: {
      backgroundColor: 'black !important',
    },
  },
})(MenuItem);

export default ZapModal;
