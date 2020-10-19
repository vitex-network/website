import BigNumber from '~/utils/bigNumber';
import { dexFund } from '~/utils/vitejs/index.js';
import { getMiningStat, getBurnedVite } from '~/services/trade.js';
import bigNumber from '../utils/bigNumber';

function formatVX(num) {
  return BigNumber.originFormat(num, 18, 2);
}

function getRateFromSymbol(rootState, symbol, coin) {
  const rateList = rootState.exchangeRate.rateSymbolMap || {};
  if (!symbol || !rateList[symbol]) {
    return null;
  }
  return rateList[symbol][`${ coin }Rate`] || null;
}

function getRate(rootState, tokenId, coin) {
  const rateList = rootState.exchangeRate.rateMap || {};
  if (!tokenId || !rateList[tokenId]) {
    return null;
  }
 
  return rateList[tokenId][`${ coin }Rate`] || null;
}

const tokenDiviList = ['VITE', 'ETH', 'BTC', 'USDT'];

const decimals = {
  'VITE': 18,
  'BTC': 8,
  'USDT': 6,
  'ETH': 18
};

const tokenMap = {
  1: 'VITE',
  2: 'ETH',
  3: 'BTC',
  4: 'USDT'
};


const state = function() {
  return {
    mineInfo: {},
    totalSupply: null,
    dividendPools: {},
    dividendStat: {},
    feesForMine: {},
    pledgeForVxSum: null,
    totalBurnedVITE: null
  };
};

const getters = {
  pledgeForVx(state, getters, rootState) {
    const { pledgeMine } = state.mineInfo;
    const { pledgeForVxSum } = state;
    const rewardPerVite = BigNumber.dividedToNumber(BigNumber.originFormat(pledgeMine, 18), BigNumber.originFormat(pledgeForVxSum, 18), 8);

    return {
      vite: formatVX(pledgeForVxSum),
      btc: BigNumber.multi(formatVX(pledgeForVxSum) || 0, getRateFromSymbol(rootState, 'VITE', 'btc') || 0),
      percentAmount: pledgeForVxSum && BigNumber.multi(rewardPerVite, 1000, 6)
    };
  },
  dividendPools(state, getters, rootState) {
    const { dividendPools } = state;
    const { lockAmount } = state.mineInfo;
    let pool = {};
    if (!dividendPools) {
      return {};
    }

    const tokenIds = [];

    for (const tokenId in dividendPools) {
      const token = dividendPools[tokenId];
      const tokenTypeName = tokenDiviList[token.quoteTokenType - 1];

      pool[tokenTypeName] = pool[tokenTypeName] || {
        amount: '0',
        decimals: 8,
        btcAmount: '0'
      };

      let amount = BigNumber.toBasic(token.amount, token.tokenInfo.decimals);

      console.log(tokenTypeName);
      console.log(amount);
      console.log(BigNumber.toBasic(lockAmount, 18));
      let amountToDivided = BigNumber.dividedToNumber(amount, 100, 18);


      pool[tokenTypeName].amount = amount;
      pool[tokenTypeName].btcAmount = BigNumber.multi(amount || 0, getRate(rootState, token.tokenInfo.tokenId, 'btc') || 0);
      pool[tokenTypeName].amountPerVx = BigNumber.dividedToNumber(amountToDivided, BigNumber.toBasic(lockAmount, 18), 18);

      tokenIds.push(token.tokenInfo.tokenId);
    }
    return pool;
  },
  minePools(state, getters, rootState) {
    let minePool = {};
    const { feesForMine } = state;
    for (const tokenNum in feesForMine) {
      let tokenName = tokenMap[tokenNum];
      let rate = getRateFromSymbol(rootState, tokenName, 'btc');
      let originAmount = feesForMine[tokenNum];
      let amount = BigNumber.toBasic(originAmount, decimals[tokenName]);

      minePool[tokenName] = minePool[tokenName] || {
        fee: '',
        btcFee: ''
      };
      minePool[tokenName].fee = amount; // parseInt(BigNumber.multi(amount || 0, viteRate || 0));
      minePool[tokenName].btcFee = BigNumber.multi(amount || 0, rate || 0);
    }
    return minePool;
  },
  dividendAllPriceBtc(state, getters, rootState) {
    const { dividendStat } = state;
    let allPrice = 0;
    for (const tokenName in dividendStat) {
      let rate = getRateFromSymbol(rootState, tokenName, 'btc');
      let originAmount = dividendStat[tokenName].dividendAmount;
      let btcAmount = BigNumber.multi(originAmount || 0, rate || 0);
      allPrice = BigNumber.plus(btcAmount, allPrice);
    }
    return allPrice;
  },
  dividendPoolsInBTCSum(state, getters, rootState) {
    const { dividendPools } = getters;
    let amount = 0;
    for (let key in dividendPools) {
      amount = BigNumber.plus(dividendPools[key].btcAmount, amount);
    }
    return amount;
  },
  viteDestoryInfo(state, getters, rootState) {
    const { dividendPools } = getters;
    const { totalBurnedVITE } = state;
    return {
      today: dividendPools.VITE && (1 * dividendPools.VITE.amount).toFixed(2),
      total: totalBurnedVITE && (1 * totalBurnedVITE).toFixed(2)
    };
  },
  mineInfo(state, getters, rootState) {
    const { historyMinedSum, lockAmount, total } = state.mineInfo;
    const { totalSupply } = state;

    let minedRatio = null;
    let lockRatio = null;
    if (totalSupply) {
      minedRatio = BigNumber.multi(historyMinedSum / totalSupply, 100, 2);
    }
    lockRatio = BigNumber.multi(lockAmount / historyMinedSum, 100, 2);
    return {
      ...state.mineInfo,
      minedRatio,
      lockRatio,
      historyMinedSum: formatVX(historyMinedSum),
      lockAmount: formatVX(lockAmount),
      total: formatVX(total)
    };
  }
};


const mutations = {
  setMineInfo(state, mineInfo) {
    state.mineInfo = mineInfo;
  },
  setTotalSupply(state, totalSupply) {
    state.totalSupply = totalSupply;
  },
  setDividendPools(state, pools) {
    state.dividendPools = pools;
  },
  setDividendStat(state, stats) {
    state.dividendStat = stats;
  },
  setFeesForMine(state, data) {
    state.feesForMine = data;
  },
  setPledgeForVxSum(state, data) {
    state.pledgeForVxSum = data;
  },
  setTotalBurnedVITE(state, data) {
    state.totalBurnedVITE = data;
  }
};

const actions = {
  getTotalVxSupply({ commit }) {
    dexFund.getTotalVxSupply().then(data=> {
      commit('setTotalSupply', data.totalSupply);
    });
  },
  getDividendInfo({ commit }) {
    dexFund.getCurrentDividendPools().then(data=> {
      commit('setDividendPools', data);
    });
    getMiningStat().then(data=> {
      commit('setDividendStat', data.userDividendStat);
    });
  },
  getMineInfo({ commit }) {
    let promises = [
      dexFund.getCurrentVxMineInfo(),
      dexFund.getAllTotalVxBalance().then(data => {
        let period = 0;
        let amount = '';
        data.funds.forEach(fund => {
          if (fund.period > period) {
            amount = fund.amount;
            period = fund.period;
          }
        });
        return amount;
      })
    ];

    Promise.all(promises).then(data => {
      commit('setMineInfo', {
        ...data[0],
        lockAmount: data[1]
      });
    });

    dexFund.getCurrentFeesForMine().then(data=> {
      // 1 VITE 2 ETH_001 3 BTC_001 4 USDT_001
      commit('setFeesForMine', data);
    });

    dexFund.getCurrentPledgeForVxSum().then(data=> {
      commit('setPledgeForVxSum', data);
    });

    getBurnedVite().then(data => {
      if (data && data.vite) {
        commit('setTotalBurnedVITE', data.vite);
      }
    });
  }
};

export default { state, mutations, actions, getters };