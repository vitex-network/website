import { get, post } from "~/api/axios";

const version = 'v1';

export default {
  limit() {
    return get(`${ version }/limit`);
  },
  klineHistory({ startTime, endTime, symbol, interval }) {
    return get(`${ version }/klines`, {
            startTime,
            endTime,
            limit: 1500,
            interval,
            symbol
    });
  },
  depth({ symbol, step }) {
    return get(`${ version }/depth`, {
        symbol, 
        step 
    });
  },
  order({ address, total, startTime, endTime, tradeTokenSymbol, quoteTokenSymbol, side, offset, limit, status }) {
    return get(`${ version }/orders`,{
        address, startTime, endTime, total, tradeTokenSymbol, quoteTokenSymbol, side, offset, limit, status
    });
  },
  orderDetail({ orderId, symbol, offset, limit, side }) {
    return get(`${ version }/trades`,{ 
        orderId, symbol, offset, limit, side 
    });
  },
  latestTx({ symbol }) {
    return get(`${ version }/trades`,{
        symbol,
        limit: 100
    });
  },
  rate() {
    return get(`${ version }/rate/usd-cny`);
  },
  rateToken({ tokenIdList = [] }) {
    const tokenIds = tokenIdList.join(',');
    return get(`${ version }/exchange-rate`, { tokenIds });
  },
  defaultPair({ quoteTokenCategory }) {
    return get(`${ version }/ticker/24hr`, {
      quoteTokenCategory
    });
  },
  assignPair({ symbols = [] }) {
    return get(`${ version }/ticker/24hr`, {
       symbols: symbols.join(',')
    });
  },
  marketsReserve({ quoteTokenSymbol }) {
    return get(`${ version }/token/unmapped`, {
       quoteTokenSymbol
    });
  },
  tokenDetail({ tokenId }) {
    return get(`${ version }/token/detail`,{
       tokenId
    });
  },
  baseToken() {
    return get(`${ version }/tokens`,{
        category: 'quote'
    });
  },
  tokenMap({ symbol }) {
    return get(`${ version }/token/mapped`,{
        quoteTokenSymbol: symbol
    });
  },
  chargeDetail({ tokenId, address }) {
    return get(`${ version }/deposit-withdraw`,{
        pageSize: 100,
        pageNo: 1,
        tokenId,
        address
    });
  },
  chargeDetail({ tokenId, address }) {
    return get(`${ version }/deposit-withdraw`, {
        pageSize: 100,
        pageNo: 1,
        tokenId,
        address
    });
  },
  tokenInfoFromGithub({ tokenSymbol, platformSymbol = 'VITE', tokenAddress } = { tokenSymbol, platformSymbol: 'VITE', tokenAddress }) {
    return post(`${ version }/cryptocurrency/info/query`, {
        tokenSymbol, platformSymbol, tokenAddress
    });
  },
  tokenRateFromCMC({ tokenSymbol, platformSymbol = 'VITE', tokenAddress } = { tokenSymbol, platformSymbol: 'VITE', tokenAddress }) {
    return post(`${ version }/cryptocurrency/rate/query`,{
        tokenSymbol, platformSymbol, tokenAddress
    });
  },
  miningTrade({ address, offset, limit = 30 }) {
    return get(`${ version }/mining/trade`, {
       address, offset, limit
    });
  },
  miningPledge({ address, offset, limit = 30 }) {
    return get(`${ version }/mining/pledge`, {
        address, offset, limit
    });
  },
  dividend({ address, offset, limit = 30 }) {
    return get(`${ version }/dividend`, {
        address, offset, limit 
    });
  },
  marketsClosed() {
    return get(`${ version }/markets/closed`);
  },
  operator(operatorId) {
    return get(`${ version }/operator`, {
        operatorId,
        offset: 0,
        limit: 100
    });
  },
  operatorTokens(operatorId) {
    return get(`${ version }/operator/tokens`,{
        operatorId,
        offset: 0,
        limit: 100
    });
  },
  operatorMarkets({ operatorId, tradeToken, offset, limit = 30 }) {
    return get(`${ version }/operator/markets`, {
        operatorId, tradeToken, offset, limit 
    });
  },
  operatorIncome({ operatorId, tradeToken, quoteToken, offset, limit = 30 }) {
    return get(`${ version }/operator/income`, {
        operatorId, tradeToken, quoteToken, offset, limit
    });
  }
};
