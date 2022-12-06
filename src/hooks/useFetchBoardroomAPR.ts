import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useRefresh from './useRefresh';

const useFetchBoardroomAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const synergyFinance = useSynergyFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchBoardroomAPR() {
      try {
        setApr(await synergyFinance.getBoardroomAPR());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoardroomAPR();
  }, [setApr, synergyFinance, slowRefresh]);

  return apr;
};

export default useFetchBoardroomAPR;
