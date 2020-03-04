import Vue from 'vue';
import Vuex from 'vuex';

import giftStore from './modules/gift-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    giftStore,
  },
});
