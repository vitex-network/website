import { baseToken } from '~/services/trade';
// import getQuery from '~/utils/query';

const quoteTokenCategory = [ 'BTC', 'ETH', 'VITE', 'USDT' ];

// const query = getQuery();
// const category = query.category;
// const symbol = query.symbol;
const DefaultCategory = 'BTC';
const DefaultSymbol = 'VITE_BTC-000';

const state = {
  quoteTokenCategory,
  curentCategory: DefaultCategory,
  DefaultSymbol,
  marketMap: [],
  marketClosed: []
};

const mutations = {
  setCurentCategory(state, category) {
    state.curentCategory = category;
  },
  setMarketMap(state, marketMap) {
    state.marketMap = marketMap;
  }
};

const actions = {
  updateMarketMap({ commit, dispatch }) {
    // Add quote token
    console.log('store_updateMarketMap');
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
