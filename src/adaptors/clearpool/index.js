// pnpm i -f
// pnpm i jest -g
// npm run test --adapter=clearpool

const { request, gql } = require('graphql-request');
const utils = require('../utils');

const poolsFunction = async () => {

  const query = gql`
   {
    allPools {
      pool
      chain
      project
      symbol
      tvlUsd
      apyBase
      apyReward
      rewardTokens
      underlyingTokens
      poolMeta
      url
      apyBaseBorrow
    }
  }
`;
  const result = await request ('https://squid.subsquid.io/cpool-squid/v/v1/graphql', query);
  let pools = []
  if (result && result.allPools) {
    result.allPools.forEach((pool) => {
      let chainName;
      switch (pool?.chain) {
        case 'MAINNET':
          chainName = 'Ethereum';
          break;
        case 'ZKEVM':
          chainName = 'Polygon zkEVM';
          break;
        default:
          chainName = utils.formatChain(pool.chain);
      }
      pool.chain = chainName;
      pools.push(pool);
    });
  }
  
  return pools

};

module.exports = {
  timetravel: false,
  apy: poolsFunction,
  url: 'https://clearpool.finance/',
};