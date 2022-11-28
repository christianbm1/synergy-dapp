import React, {/*useCallback, useEffect, */ useMemo, useState} from 'react';
import Page from '../../components/Page';
import BondImage from '../../assets/img/pit.png';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import {Box, /* Paper, Typography,*/ Button, Grid} from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import usePushFinance from '../../hooks/usePushFinance';
import {getDisplayBalance /*, getBalance*/} from '../../utils/formatBalance';
import {BigNumber /*, ethers*/} from 'ethers';
import useSwapPBondToPShare from '../../hooks/PShareSwapper/useSwapPBondToPShare';
import useApprove, {ApprovalState} from '../../hooks/useApprove';
import usePShareSwapperStats from '../../hooks/PShareSwapper/usePShareSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BondImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const pushFinance = usePushFinance();
  const [pbondAmount, setPbondAmount] = useState('');
  const [pshareAmount, setPshareAmount] = useState('');

  const [approveStatus, approve] = useApprove(pushFinance.PBOND, pushFinance.contracts.PShareSwapper.address);
  const {onSwapPShare} = useSwapPBondToPShare();
  const pshareSwapperStat = usePShareSwapperStats(account);

  const pshareBalance = useMemo(
    () => (pshareSwapperStat ? Number(pshareSwapperStat.pshareBalance) : 0),
    [pshareSwapperStat],
  );
  const bondBalance = useMemo(
    () => (pshareSwapperStat ? Number(pshareSwapperStat.pbondBalance) : 0),
    [pshareSwapperStat],
  );

  const handlePBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setPbondAmount('');
      setPshareAmount('');
      return;
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setPbondAmount(e.currentTarget.value);
    const updatePShareAmount = await pushFinance.estimateAmountOfPShare(e.currentTarget.value);
    setPshareAmount(updatePShareAmount);
  };

  const handlePBondSelectMax = async () => {
    setPbondAmount(String(bondBalance));
    const updatePShareAmount = await pushFinance.estimateAmountOfPShare(String(bondBalance));
    setPshareAmount(updatePShareAmount);
  };

  const handlePShareSelectMax = async () => {
    setPshareAmount(String(pshareBalance));
    const ratePSharePerPush = (await pushFinance.getPShareSwapperStat(account)).ratePSharePerPush;
    const updatePBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(ratePSharePerPush))
      .mul(Number(pshareBalance) * 1e6);
    setPbondAmount(getDisplayBalance(updatePBondAmount, 18, 6));
  };

  const handlePShareChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setPshareAmount('');
      setPbondAmount('');
      return;
    }
    if (!isNumeric(inputData)) return;
    setPshareAmount(inputData);
    const ratePSharePerPush = (await pushFinance.getPShareSwapperStat(account)).ratePSharePerPush;
    const updatePBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(ratePSharePerPush))
      .mul(Number(inputData) * 1e6);
    setPbondAmount(getDisplayBalance(updatePBondAmount, 18, 6));
  };

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'💣'} title="PBond -> PShare Swap" subtitle="Swap PBond to PShare" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>PBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={pushFinance.PBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handlePBondSelectMax}
                                onChange={handlePBondChange}
                                value={pbondAmount}
                                max={bondBalance}
                                symbol="PBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} PBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg" />
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>PShare</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={pushFinance.PSHARE.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handlePShareSelectMax}
                                onChange={handlePShareChange}
                                value={pshareAmount}
                                max={pshareBalance}
                                symbol="PShare"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${pshareBalance} PSHARE Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                        {approveStatus !== ApprovalState.APPROVED ? (
                          <Button
                            disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                            color="primary"
                            variant="contained"
                            onClick={approve}
                            size="medium"
                          >
                            Approve PBOND
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSwapPShare(pbondAmount.toString())}
                            size="medium"
                          >
                            Swap
                          </Button>
                        )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;
