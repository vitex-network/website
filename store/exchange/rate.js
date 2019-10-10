import { timer } from '~/utils/asyncFlow';
import { rateToken, rateTokenSymbols } from '~/services/trade';

const loopTime = 1000 * 60;
let rateTimer = null;
let rateSymbolTimer = null;

let state = function() {
  return { rateMap: {}, rateTokenIds: [], rateSymbolMap: {}};
};

// const state = { rateMap: {}, rateTokenIds: [], rateSymbolMap: {}};

const mutations = {
  setExchangeRate(state, rateList) {
    state.rateMap = {};
    rateList && rateList.forEach(rate => {
      state.rateMap[rate.tokenId] = rate;
    });
  },
  setRateSymbol(state, rateList) {
    state.rateSymbolMap = {};
    rateList && rateList.forEach(rate => {
      let tokenSymbol = rate.tokenSymbol && rate.tokenSymbol.split('-')[0];
      state.rateSymbolMap[tokenSymbol] = rate;
    });
    for (let key in state.rateSymbolMap) {
      state.rateSymbolMap[key].viteRate = state.rateSymbolMap[key].usdRate / state.rateSymbolMap['VITE'].usdRate;
    }
  },
  setRateTokenIds(state, payload) {
    state.rateTokenIds = Array.from(new Set([ ...state.rateTokenIds, ...payload ]));
  }
};

const actions = {
  startLoopRateBySymbol({ commit, dispatch }) {
    dispatch('stopLoopRateBySymbol');
    const f = () => {
      return rateTokenSymbols({ tokenSymbolList: ['ETH-000','VITE','BTC-000','USDT-000'] }).then(data => {
        commit('setRateSymbol', data);
      });
    };

    rateSymbolTimer = new timer(f, loopTime);
    rateSymbolTimer.start();
  },
  stopLoopRateBySymbol() {
    rateSymbolTimer && rateSymbolTimer.stop();
    rateSymbolTimer = null;
  },
  startLoopExchangeRate({ commit, dispatch, state }) {
    dispatch('stopLoopExchangeRate');
    const f = () => {
      if (!state.rateTokenIds || !state.rateTokenIds.length) {
        return;
      }
      return rateToken({ tokenIdList: state.rateTokenIds }).then(data => {
        commit('setExchangeRate', data);
      });
    };

    rateTimer = new timer(f, loopTime);
    rateTimer.start();
  },
  stopLoopExchangeRate() {
    rateTimer && rateTimer.stop();
    rateTimer = null;
  },
  addRateTokens({ commit, state }, payload = []) {
    const contains = payload.every(t => state.rateTokenIds.findIndex(n => n === t) >= 0);
    if (contains) return;
    commit('setRateTokenIds', payload);
    rateToken({ tokenIdList: state.rateTokenIds }).then(data => {
      commit('setExchangeRate', data);
    });
  }
};

export default {
  state,
  mutations,
  actions
};
