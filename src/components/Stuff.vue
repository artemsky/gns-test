<template>
  <div class="container">
    <div class="card">
      <stuff-header />
      <div class="card-body p-0">
        <div class="table-responsive-md">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Currency</th>
              </tr>
            </thead>
            <tbody>
              <stuff-item v-for="(item, index) in stuff" :item="item" :index="index + 1" :key="item.id"/>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer text-muted d-flex justify-content-between">
        <stuff-pagination />
        <div class="d-flex flex-column">
          <div><b>Total:</b> {{total}}</div>
          <div><b>Total at this page:</b> {{totalThisPage}}</div>
        </div>

      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
  import { mapGetters } from 'vuex';
  import StuffHeader from './StuffHeader';
  import StuffItem from './StuffItem';
  import StuffPagination from './StuffPagination';
  import { GET_STUFF, GET_TOTAL, GET_TOTAL_FROM_CURRENT_PAGE } from '../store/getters.type';
  import { FETCH_DATA } from '../store/actions.type';

  export default {
    name: 'stuff',
    components: {
      StuffHeader,
      StuffItem,
      StuffPagination,
    },
    computed: {
      ...mapGetters({
        stuff: GET_STUFF,
        total: GET_TOTAL,
        totalThisPage: GET_TOTAL_FROM_CURRENT_PAGE,
      }),
    },
    created() {
      this.$store.dispatch(FETCH_DATA);
    },
  };
</script>

<style lang="scss" scoped>
  .search {
    font-size: 0;
    .fa {
      font-size: 1rem;
    }
  }
  .dropdown-menu {
    right: 0;
    left: auto;
  }
</style>
