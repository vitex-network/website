import { baseToken, assignPair } from '~/services/trade';

let quoteTokenCategory = [ 'BTC', 'ETH', 'VITE', 'USDT'];

let DefaultCategory = 'BTC';

const landingMarkets = ['VITE_BTC-000', 'VITE_USDT-000', 'VX_BTC-000', 'VX_USDT-000'];

let state = function() {
  return {
    operatorInfoMap: {},
    currentOperatorInfo: {},
    quoteTokenCategory,
    curentCategory: DefaultCategory,
    marketMap: [],
    marketClosed: [],
    landingMarkets: [],
  };
};

const mutations = {
  setCurentCategory(state, category) {
    state.curentCategory = category;
  },
  setMarketMap(state, marketMap) {
    state.marketMap = marketMap;
  },
  setOperatorInfo(state, operatorInfo) {
    state.operatorInfoMap = operatorInfo;
  },
  setCurrentOperator(state, address) {
    state.currentOperatorInfo = state.operatorInfoMap[address];
  },
  setLandingMarkets(state, data) {
    state.landingMarkets = data;
  }
};

const actions = {
  updateMarketMap({ commit, dispatch }) {
    // Add quote token
    baseToken().then(data => {
      const marketMap = data || [];
      commit('setMarketMap', marketMap);

      const tokenIds = [];
      marketMap.forEach(({ tokenId }) => {
        tokenIds.push(tokenId);
      });
      dispatch('addRateTokens', tokenIds);
    });
  },
  getLandingMarkets({ commit }) {
    assignPair({
      symbols: landingMarkets
    }).then(data => {
      commit('setLandingMarkets', data);
    });
  }
};

export default { state, mutations, actions };
