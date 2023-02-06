import { gql } from "@apollo/client";

export const CRS_BUSD_TVL = gql`
  query CRS_BUSD_TVL {
    pool(
      type: "v2"
      chainId: 56
      pid: 165
    ) {
      tvl
    }
  }
`;