import {useEffect, useState} from 'react';
import usePushFinance from './usePushFinance';
import useRefresh from './useRefresh';

const useFetchBoardroomAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const pushFinance = usePushFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchBoardroomAPR() {
      try {
        setApr(await pushFinance.getBoardroomAPR());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoardroomAPR();
  }, [setApr, pushFinance, slowRefresh]);

  return apr;
};

export default useFetchBoardroomAPR;
