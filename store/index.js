import Vue from 'vue';
import vuex from 'vuex';

import exchange from './exchange/index';


Vue.use(vuex);

const store = ()=> {
  let store = new vuex.Store();
  for (const moduleName in exchange) {
    store.registerModule(moduleName, exchange[moduleName]);
  }
  store.dispatch('updateMarketMap');
  return store;
};

export default store;
