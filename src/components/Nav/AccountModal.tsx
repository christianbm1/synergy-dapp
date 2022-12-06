import React, {useMemo} from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';

import Label from '../Label';
import Modal, {ModalProps} from '../Modal';
import ModalTitle from '../ModalTitle';
import useSynergyFinance from '../../hooks/useSynergyFinance';
import TokenSymbol from '../TokenSymbol';
import {useMediaQuery} from '@material-ui/core';


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
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="CRS" />
          <StyledBalance>
            <StyledValue>{displayCRSBalance}</StyledValue>
            <Label text="CRS Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="DIA" />
          <StyledBalance>
            <StyledValue>{displayDIABalance}</StyledValue>
            <Label text="DIA Available" />
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
