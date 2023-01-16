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
      <Container style={{paddingBottom: '2rem', maxWidth: '1440px', padding: '0'}}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Page;
