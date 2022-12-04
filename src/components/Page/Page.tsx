import React from 'react';
import {Container} from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';

import Footer from '../Footer';
import Nav from '../Nav';

const Page: React.FC = ({children}) => {
  useEagerConnect();
  return (
    <div style={{position: 'relative', minHeight: '100vh'}}>
      <Nav />
      <Container maxWidth="xl" style={{paddingBottom: '5rem'}}>
        {children}
      </Container>
    </div>
  );
};

export default Page;
