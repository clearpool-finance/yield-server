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
  const pools = await request ('https://squid.subsquid.io/cpool-squid/v/v1/graphql', query);

  return pools?.allPools

};

module.exports = {
  timetravel: false,
  apy: poolsFunction,
  url: 'https://clearpool.finance/',
};