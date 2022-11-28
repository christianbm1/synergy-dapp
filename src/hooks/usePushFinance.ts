import {useContext} from 'react';
import {Context} from '../contexts/PushFinanceProvider';

const usePushFinance = () => {
  const {pushFinance} = useContext(Context);
  return pushFinance;
};

export default usePushFinance;
