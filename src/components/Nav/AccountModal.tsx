import React, {useMemo} from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';

import Label from '../Label';
import Modal, {ModalProps} from '../Modal';
import ModalTitle from '../ModalTitle';
import usePushFinance from '../../hooks/usePushFinance';
import TokenSymbol from '../TokenSymbol';
import {useMediaQuery} from '@material-ui/core';


const AccountModal: React.FC<ModalProps> = ({onDismiss}) => {
  const pushFinance = usePushFinance();

  const pushBalance = useTokenBalance(pushFinance.PUSH);
  const displayPushBalance = useMemo(() => getDisplayBalance(pushBalance, 18, 2), [pushBalance]);

  const pshareBalance = useTokenBalance(pushFinance.PSHARE);
  const displayPshareBalance = useMemo(() => getDisplayBalance(pshareBalance, 18, 2), [pshareBalance]);

  const pbondBalance = useTokenBalance(pushFinance.PBOND);
  const displayPbondBalance = useMemo(() => getDisplayBalance(pbondBalance, 18, 2), [pbondBalance]);

  const xpushBalance = useTokenBalance(pushFinance.XPUSH);
  const displayXpushBalance = useMemo(() => getDisplayBalance(xpushBalance, 18, 2), [xpushBalance]);

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances style={{display: 'flex', flexDirection: matches ? 'row' : 'column'}}>
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="PUSH" />
          <StyledBalance>
            <StyledValue>{displayPushBalance}</StyledValue>
            <Label text="PUSH Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="PSHARE" />
          <StyledBalance>
            <StyledValue>{displayPshareBalance}</StyledValue>
            <Label text="PSHARE Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="XPUSH" />
          <StyledBalance>
            <StyledValue>{displayXpushBalance}</StyledValue>
            <Label text="XPUSH Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="PBOND" />
          <StyledBalance>
            <StyledValue>{displayPbondBalance}</StyledValue>
            <Label text="PBOND Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
