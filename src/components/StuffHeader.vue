<template>
  <div class="card-header text-right">
    <div class="input-group">
      <input type="text" class="form-control from-control-sm" aria-label="Search block" placeholder="Search..." v-model="searchValue">
      <div class="input-group-append" :class="{'show': advancedSearchOpen}">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" aria-haspopup="true" @click="advancedSearchOpen = !advancedSearchOpen">
          <i class="fa fa-cogs"></i> {{activeFilter}}
        </button>
        <div class="dropdown-menu" :class="{'show': advancedSearchOpen}">
          <a class="dropdown-item" href="#" @click.prevent="activateFilter(key)" v-for="(value, key) in filterOptions" :key="key">{{value}}</a>
        </div>
      </div>
    </div>
    <!-- /.btn btn-primary -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { SET_SEARCH_VALUE, SET_ACTIVE_FILTER } from '../store/actions.type';
  import { GET_ACTIVE_FILTER, GET_SEARCH_VALUE, GET_FILTER_OPTIONS } from '../store/getters.type';

  export default {
    name: 'stuff-header',
    data: () => ({
      advancedSearchOpen: false,
    }),
    computed: {
      ...mapGetters({
        filterOptions: GET_FILTER_OPTIONS,
        activeFilter: GET_ACTIVE_FILTER,
      }),
      searchValue: {
        get() {
          return this.$store.getters[GET_SEARCH_VALUE];
        },
        set(value) {
          this.$store.dispatch(SET_SEARCH_VALUE, value);
        },
      },
    },
    methods: {
      activateFilter(value) {
        this.$store.dispatch(SET_ACTIVE_FILTER, value);
        this.advancedSearchOpen = false;
      },
    },
  };
</script>

<style scoped>
  .dropdown-menu {
    right: 0;
    left: auto
  }
</style>
