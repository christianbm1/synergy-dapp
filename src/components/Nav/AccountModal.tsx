import React, {useMemo} from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';

import Label from '../Label';
import Modal, {ModalProps} from '../Modal';
import ModalTitle from '../ModalTitle';
import useSynergyFinance from '../../hooks/useSynergyFinance';
import TokenSymbol from '../TokenSymbol';
import {Typography, useMediaQuery} from '@material-ui/core';


const AccountModal: React.FC<ModalProps> = ({onDismiss}) => {
  const synergyFinance = useSynergyFinance();

  const crsBalance = useTokenBalance(synergyFinance.CRS);
  const displayCRSBalance = useMemo(() => getDisplayBalance(crsBalance, 18, 2), [crsBalance]);

  const diaBalance = useTokenBalance(synergyFinance.DIA);
  const displayDIABalance = useMemo(() => getDisplayBalance(diaBalance, 18, 2), [diaBalance]);

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances style={{display: 'flex', flexDirection: matches ? 'row' : 'column'}}>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="CRS" />
          <StyledBalance>
            <StyledValue>{displayCRSBalance}</StyledValue>
            <Typography style={{ fontSize: '18px' }}>CRS Available</Typography>
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="DIA" />
          <StyledBalance>
            <StyledValue>{displayDIABalance}</StyledValue>
            <Typography style={{ fontSize: '18px' }}>DIA Available</Typography>
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  font-family: 'Poppins';
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
