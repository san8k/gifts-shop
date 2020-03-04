import giftStoreApi from '../../services/gift-store';

export default {
  namespaced: true,

  state: {
    /**
     * Условия получения подарка
     */
    terms: null,

    /**
     * Баллы
     * @type Cart
     */
    points: null,

    gifts: null,

    /**
     * Методы сортировки и ключи локализации для них
     * @type Object
     */
    sortMethods: [
      {
        type: 'default',
        name: 'По-умолчанию',
      },
      {
        type: 'cheap',
        name: 'По возрастанию стоимости',
      },
      {
        type: 'expensive',
        name: 'По уменьшению стоимости',
      },
      {
        type: 'new',
        name: 'Сначала новые',
      },
      {
        type: 'old',
        name: 'Сначала старые',
      },
    ],

    currentSort: 0,

    // текущая страница
    currentPage: 1,

    // настройки отображения
    settings: null,
  },

  getters: {
    sortMethods: state => state.sortMethods,
    currentSort: state => state.currentSort,
    chosenSortMethod: state => state.sortMethods[state.currentSort],
    points: state => state.points,
    gifts: state => state.gifts,
    terms: state => state.terms,
    currentPage: state => state.currentPage,
    settings: state => state.settings,
  },

  actions: {
    /**
     * Получим условия
     */
    getTerms({ commit }) {
      return giftStoreApi.getTerms()
        .then((payload) => {
          if (!payload) {
            return;
          }
          commit('changeTerms', payload.data.terms);
        });
    },

    /**
     * Вернет список подарков
     * @param commit
     * @param page
     * @param sort
     */
    getGifts({ commit }) {
      giftStoreApi.getGifts()
        .then((payload) => {
          if (!payload) {
            return;
          }
          commit('changeGifts', payload.data.gifts);
          commit('changeSettings', payload.data.settings);
        });
    },

    getPoints({ commit }) {
      giftStoreApi.getPoints()
        .then((payload) => {
          if (!payload) {
            return;
          }

          commit('changePoints', payload.data.points);
        });
    },
  },

  mutations: {
    changeCurrentSort(state, payload) {
      state.currentSort = payload;
    },

    changeTerms(state, payload) {
      state.terms = payload;
    },

    changePoints(state, payload) {
      state.points = payload;
    },

    changeGifts(state, payload) {
      state.gifts = payload;
    },

    changeCurrentPage(state, payload) {
      state.currentPage = payload;
    },

    changeSettings(state, payload) {
      state.settings = payload;
    },
  },
};
