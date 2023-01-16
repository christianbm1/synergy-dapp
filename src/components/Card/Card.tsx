import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({children}) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: #040B11;
  color: white !important;
  border: 2px solid #141B22;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Card;
