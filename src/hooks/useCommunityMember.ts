import {useEffect, useState} from 'react';
import useSynergyFinance from './useSynergyFinance';
import useRefresh from './useRefresh';

const useCommunityMember = () => {
  const [totalMembers, setTotalMembers] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const synergyFinance = useSynergyFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalMembers(await synergyFinance.getCommunityMember());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalMembers, synergyFinance, slowRefresh]);

  return totalMembers;
};

export default useCommunityMember;
