import {useContext} from 'react';
import {Context} from '../contexts/SynergyFinanceProvider';

const useSynergyFinance = () => {
  const {synergyFinance} = useContext(Context);
  return synergyFinance;
};

export default useSynergyFinance;
