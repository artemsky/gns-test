import Api from '../common/Api.service';
import {
  GET_STUFF,
  GET_STUFF_PAGES_COUNT,
  GET_CURRENT_PAGE,
  GET_TOTAL,
  GET_TOTAL_FROM_CURRENT_PAGE,
} from './getters.type';
import {
  FETCH_DATA,
  CHANGE_FILTER,
  CHANGE_PAGE,
} from './actions.type';
import {
  FETCH_START,
  FETCH_END,
  UPDATE_FILTER,
  UPDATE_PAGE,
} from './mutations.type';

const vState = {
  stuff: [],
  isLoading: false,
  activeFilter: 'Global',
  filterOptions: {
    global: 'Global',
    name: 'Name',
    location: 'Location',
    currency: 'Currency',
  },
  activePage: 1,
  itemsPerPage: 10,
};

const getters = {
  [GET_STUFF](state) {
    const start = (state.activePage - 1) * state.itemsPerPage;
    const end = state.activePage * state.itemsPerPage;
    return state.stuff
      .slice(start, end);
  },
  [GET_STUFF_PAGES_COUNT](state) {
    return state.stuff.length / state.itemsPerPage;
  },
  [GET_CURRENT_PAGE](state) {
    return state.activePage;
  },
  [GET_TOTAL_FROM_CURRENT_PAGE](state, getter) {
    return getter[GET_STUFF].reduce((a, b) => a + parseInt(b.currency, 10), 0);
  },
  [GET_TOTAL](state) {
    return state.stuff.reduce((a, b) => a + parseInt(b.currency, 10), 0);
  },
};

const actions = {
  async [FETCH_DATA]({ commit }) {
    commit(FETCH_START);
    try {
      const data = await Api.getData();
      commit(FETCH_END, data);
    } catch (error) {
      throw new Error(error);
    }
  },
  [CHANGE_FILTER]({ commit }, value) {
    commit(UPDATE_FILTER, value);
  },
  [CHANGE_PAGE]({ commit }, page) {
    commit(UPDATE_PAGE, page);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, stuff) {
    state.stuff = stuff;
  },
  [UPDATE_FILTER](state, value) {
    state.activeFilter = value;
  },
  [UPDATE_PAGE](state, page) {
    state.activePage = page;
  },
};

export default {
  state: vState,
  getters,
  actions,
  mutations,
};
