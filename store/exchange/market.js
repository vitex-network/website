import { baseToken } from '~/services/trade';

let quoteTokenCategory = [ 'BTC', 'ETH', 'VITE', 'USDT' ];

let DefaultCategory = 'BTC';

let state = function() {
  return {
    operatorInfoMap: {},
    currentOperatorInfo: {},
    quoteTokenCategory,
    curentCategory: DefaultCategory,
    marketMap: [],
    marketClosed: []
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
  }
};

export default { state, mutations, actions };
