import React, {useState, useMemo} from 'react';

import {Button, Select, MenuItem, InputLabel, withStyles} from '@material-ui/core';
// import Button from '../../../components/Button'
import Modal, {ModalProps} from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import styled from 'styled-components';

import {getDisplayBalance} from '../../../utils/formatBalance';
import Label from '../../../components/Label';
import useLpStats from '../../../hooks/useLpStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useSynergyFinance from '../../../hooks/useSynergyFinance';
import {useWallet} from 'use-wallet';
import useApproveZapper, {ApprovalState} from '../../../hooks/useApproveZapper';
import {CRS_TICKER, DIA_TICKER, BNB_TICKER, BUSD_TICKER} from '../../../utils/constants';
import {Alert} from '@material-ui/lab';

interface ZapProps extends ModalProps {
  onConfirm: (zapAsset: string, lpName: string, amount: string) => void;
  tokenName?: string;
  decimals?: number;
}

const ZapModal: React.FC<ZapProps> = ({onConfirm, onDismiss, tokenName = '', decimals = 18}) => {
  const synergyFinance = useSynergyFinance();
  const {balance} = useWallet();
  const ftmBalance = (Number(balance) / 1e18).toFixed(4).toString();
  const crsBalance = useTokenBalance(synergyFinance.CRS);
  const pshareBalance = useTokenBalance(synergyFinance.DIA);
  const btcBalance = useTokenBalance(synergyFinance.BUSD);
  const [val, setVal] = useState('');
  const [zappingToken, setZappingToken] = useState(BNB_TICKER);
  const [zappingTokenBalance, setZappingTokenBalance] = useState(ftmBalance);
  const [estimate, setEstimate] = useState({token0: '0', token1: '0'}); // token0 will always be BNB in this case
  const [approveZapperStatus, approveZapper] = useApproveZapper(zappingToken);
  const crsFtmLpStats = useLpStats('CRS/BUSD');
  const pShareFtmLpStats = useLpStats('DIA/BNB');
  const crsLPStats = useMemo(() => (crsFtmLpStats ? crsFtmLpStats : null), [crsFtmLpStats]);
  const pshareLPStats = useMemo(() => (pShareFtmLpStats ? pShareFtmLpStats : null), [pShareFtmLpStats]);
  const ftmAmountPerLP = tokenName.startsWith(CRS_TICKER) ? crsLPStats?.ftmAmount : pshareLPStats?.ftmAmount;
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
    setZappingTokenBalance(ftmBalance);
    if (event.target.value === DIA_TICKER) {
      setZappingTokenBalance(getDisplayBalance(pshareBalance, decimals));
    }
    if (event.target.value === CRS_TICKER) {
      setZappingTokenBalance(getDisplayBalance(crsBalance, decimals));
    }
    if (event.target.value === BUSD_TICKER) {
      setZappingTokenBalance(getDisplayBalance(btcBalance, decimals));
    }
  };

  const handleChange = async (e: any) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setVal(e.currentTarget.value);
      setEstimate({token0: '0', token1: '0'});
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setVal(e.currentTarget.value);
    const estimateZap = await synergyFinance.estimateZapIn(zappingToken, tokenName, String(e.currentTarget.value));
    setEstimate({token0: estimateZap[0].toString(), token1: estimateZap[1].toString()});
  };

  const handleSelectMax = async () => {
    setVal(zappingTokenBalance);
    const estimateZap = await synergyFinance.estimateZapIn(zappingToken, tokenName, String(zappingTokenBalance));
    setEstimate({token0: estimateZap[0].toString(), token1: estimateZap[1].toString()});
  };

  return (
    <Modal>
      <ModalTitle text={`Zap in ${tokenName}`} />

      <StyledActionSpacer />
      <InputLabel style={{color: '#2c2560'}} id="label">
        Select asset to zap with
      </InputLabel>
      <Select onChange={handleChangeAsset} style={{color: '#2c2560'}} labelId="label" id="select" value={zappingToken}>
        <StyledMenuItem value={BNB_TICKER}>BNB</StyledMenuItem>
        <StyledMenuItem value={DIA_TICKER}>DIA</StyledMenuItem>
        {/* <StyledMenuItem value={BUSD_TICKER}>BUSD</StyledMenuItem> */}
        {/* Push as an input for zapping will be disabled due to issues occuring with the Gatekeeper system */}
        {/* <StyledMenuItem value={CRS_TICKER}>CRS</StyledMenuItem> */}
      </Select>
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={zappingTokenBalance}
        symbol={zappingToken}
      />
      <Label text="Zap Estimations" />
      <StyledDescriptionText>
        {' '}
        {tokenName}: {Number(estimate.token0) / Number(ftmAmountPerLP)}
      </StyledDescriptionText>
      <StyledDescriptionText>
        {' '}
        ({Number(estimate.token0)} {tokenName.startsWith(DIA_TICKER) ? DIA_TICKER : BNB_TICKER} /{' '}
        {Number(estimate.token1)} {tokenName.startsWith(DIA_TICKER) ? BNB_TICKER : DIA_TICKER}){' '}
      </StyledDescriptionText>
      <ModalActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            approveZapperStatus !== ApprovalState.APPROVED ? approveZapper() : onConfirm(zappingToken, tokenName, val)
          }
        >
          {approveZapperStatus !== ApprovalState.APPROVED ? 'Approve' : "Let's go"}
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
    color: '#2c2560',
    '&:hover': {
      backgroundColor: 'grey',
      color: '#2c2560',
    },
    selected: {
      backgroundColor: 'black',
    },
  },
})(MenuItem);

export default ZapModal;
