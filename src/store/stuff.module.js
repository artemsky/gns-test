import Api from '../common/Api.service';
import {
  GET_STUFF,
  GET_FILTERED_STUFF,
  GET_STUFF_PAGES_COUNT,
  GET_CURRENT_PAGE,
  GET_TOTAL,
  GET_TOTAL_FROM_CURRENT_PAGE,
  GET_FILTER_OPTIONS,
  GET_ACTIVE_FILTER,
  GET_SEARCH_VALUE,
  IS_LOADING,
} from './getters.type';
import {
  FETCH_DATA,
  CHANGE_FILTER,
  CHANGE_PAGE,
  SET_ACTIVE_FILTER,
  SET_SEARCH_VALUE,
  CHANGE_STUFF,
} from './actions.type';
import {
  FETCH_START,
  FETCH_END,
  UPDATE_FILTER,
  UPDATE_PAGE,
  UPDATE_ACTIVE_FILTER,
  UPDATE_SEARCH_VALUE,
  UPDATE_STUFF,
} from './mutations.type';

const filter = {
  global: 'global',
  name: 'name',
  location: 'location',
  currency: 'currency',
};

const vState = {
  stuff: [],
  isLoading: false,
  activeFilter: 'global',
  searchValue: null,
  filterOptions: {
    [filter.global]: 'Global',
    [filter.name]: 'Name',
    [filter.location]: 'Location',
    [filter.currency]: 'Currency',
  },
  activePage: 1,
  itemsPerPage: 10,
};

const getters = {
  [GET_STUFF](state, getter) {
    const start = (state.activePage - 1) * state.itemsPerPage;
    const end = state.activePage * state.itemsPerPage;
    return getter[GET_FILTERED_STUFF]
      .slice(start, end);
  },
  [GET_FILTERED_STUFF](state) {
    if (state.searchValue) {
      return state.stuff.filter((stuff) => {
        if (state.activeFilter === filter.global) {
          return Object
            .keys(stuff)
            .some(key => stuff[key]
              .toString()
              .toLocaleLowerCase()
              .includes(state.searchValue.toLocaleLowerCase()));
        }
        return stuff[state.activeFilter]
          .toString()
          .toLocaleLowerCase()
          .includes(state.searchValue.toLocaleLowerCase());
      });
    }
    return state.stuff;
  },
  [GET_STUFF_PAGES_COUNT](state, getter) {
    return Math.ceil(getter[GET_FILTERED_STUFF].length / state.itemsPerPage);
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
  [IS_LOADING](state) {
    return state.isLoading;
  },
  [GET_FILTER_OPTIONS](state) {
    return state.filterOptions;
  },
  [GET_ACTIVE_FILTER](state) {
    return state.activeFilter;
  },
  [GET_SEARCH_VALUE](state) {
    return state.searchValue;
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
  [SET_ACTIVE_FILTER]({ commit }, value) {
    commit(UPDATE_ACTIVE_FILTER, value);
  },
  [SET_SEARCH_VALUE]({ commit }, value) {
    commit(UPDATE_SEARCH_VALUE, value);
  },
  [CHANGE_STUFF]({ commit }, payload) {
    commit(UPDATE_STUFF, payload);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, stuff) {
    state.stuff = stuff;
    state.isLoading = false;
  },
  [UPDATE_FILTER](state, value) {
    state.activeFilter = value;
  },
  [UPDATE_PAGE](state, page) {
    state.activePage = page;
  },
  [UPDATE_ACTIVE_FILTER](state, value) {
    state.activePage = 1;
    state.activeFilter = value;
  },
  [UPDATE_SEARCH_VALUE](state, value) {
    state.activePage = 1;
    state.searchValue = value;
  },
  [UPDATE_STUFF](state, { id, value, field }) {
    const element = state.stuff.find(stuff => stuff.id === id);
    if (element && typeof element[field] !== 'undefined') {
      element[field] = value;
    }
  },
};

export default {
  state: vState,
  getters,
  actions,
  mutations,
};
