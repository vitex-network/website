import { get, post } from '../api/axios';

const version = 'v1';

export function limit() {
  return get(`${ version }/limit`);
}

export function klineHistory({ startTime, endTime, symbol, interval }) {
  return get(`${ version }/klines`, {
    startTime,
    endTime,
    limit: 1500,
    interval,
    symbol
  });
}

export function depth({ symbol, step }) {
  return get(`${ version }/depth`, {
    symbol, 
    step 
  });
}

export function order({ address, total, startTime, endTime, tradeTokenSymbol, quoteTokenSymbol, side, offset, limit, status }) {
  return get(`${ version }/orders`,{
    address, startTime, endTime, total, tradeTokenSymbol, quoteTokenSymbol, side, offset, limit, status
  });
}


export function orderDetail({ orderId, symbol, offset, limit, side }) {
  return get(`${ version }/trades`,{ 
    orderId, symbol, offset, limit, side 
  });
}

export function latestTx({ symbol }) {
  return get(`${ version }/trades`,{
    symbol,
    limit: 100
  });
}

export function rate() {
  return get(`${ version }/rate/usd-cny`);
}

export function rateToken({ tokenIdList = [] }) {
  const tokenIds = tokenIdList.join(',');
  return get(`${ version }/exchange-rate`, { tokenIds });
}

export function rateTokenSymbols({ tokenSymbolList = [] }) {
  const tokenSymbols = tokenSymbolList.join(',');
  return get(`${ version }/exchange-rate`, { tokenSymbols });
}

export function defaultPair({ quoteTokenCategory }) {
  return get(`${ version }/ticker/24hr`, {
    quoteTokenCategory
  });
}

export function assignPair({ symbols = [] }) {
  return get(`${ version }/ticker/24hr`, {
    symbols: symbols.join(',')
  });
}

export function marketsReserve({ quoteTokenSymbol }) {
  return get(`${ version }/token/unmapped`, {
    quoteTokenSymbol
  });
}

export function tokenDetail({ tokenId }) {
  return get(`${ version }/token/detail`,{
    tokenId
  });
}

export function baseToken() {
  return get(`${ version }/tokens`,{
    category: 'quote'
  });
}

export function tokenMap({ symbol }) {
  return get(`${ version }/token/mapped`,{
    quoteTokenSymbol: symbol
  });
}

export function chargeDetail({ tokenId, address }) {
  return get(`${ version }/deposit-withdraw`,{
    pageSize: 100,
    pageNo: 1,
    tokenId,
    address
  });
}

export function tokenInfoFromGithub({ tokenSymbol, platformSymbol = 'VITE', tokenAddress } = { tokenSymbol, platformSymbol: 'VITE', tokenAddress }) {
  return post(`${ version }/cryptocurrency/info/query`, {
    tokenSymbol, platformSymbol, tokenAddress
  });
}

export function tokenRateFromCMC({ tokenSymbol, platformSymbol = 'VITE', tokenAddress } = { tokenSymbol, platformSymbol: 'VITE', tokenAddress }) {
  return post(`${ version }/cryptocurrency/rate/query`,{
    tokenSymbol, platformSymbol, tokenAddress
  });
}

export function miningTrade({ address, offset, limit = 30 }) {
  return get(`${ version }/mining/trade`, {
    address, offset, limit
  });
}

export function miningPledge({ address, offset, limit = 30 }) {
  return get(`${ version }/mining/pledge`, {
    address, offset, limit
  });
}

export function dividend({ address, offset, limit = 30 }) {
  return get(`${ version }/dividend`, {
    address, offset, limit 
  });
}

export function marketsClosed() {
  return get(`${ version }/markets/closed`);
}

export function operator(operatorId) {
  return get(`${ version }/operator`, {
    operatorId,
    offset: 0,
    limit: 100
  });
}

export function operatorTokens(operatorId) {
  return get(`${ version }/operator/tokens`,{
    operatorId,
    offset: 0,
    limit: 100
  });
}

export function operatorMarkets({ operatorId, tradeToken, offset, limit = 30 }) {
  return get(`${ version }/operator/markets`, {
    operatorId, tradeToken, offset, limit 
  });
}

export function operatorIncome({ operatorId, tradeToken, quoteToken, offset, limit = 30 }) {
  return get(`${ version }/operator/income`, {
    operatorId, tradeToken, quoteToken, offset, limit
  });
}

export function operatorName(list) {
  return post(`${ version }/operator/tradepair`, list);
}

export function operatorInfo(addresslist) {
  return post(`${ version }/operator/info`, addresslist);
}

export function operatorVolumes(addresslist) {
  return post(`${ version }/operator/volumes`, addresslist);
}

export function getMiningStat() {
  return get(`${ version }/mining/stat`);
}

export function getBurnedVite() {
  return get(`${ version }/mining/burn`);
}
