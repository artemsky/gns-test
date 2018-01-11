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
              <stuff-item v-for="(item, index) in tableData" :item="item" :index="index + 1" :key="item.id"/>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer text-muted d-flex justify-content-between">
        <stuff-pagination v-model="activePage" :totalCount="stuff.length / itemsPerPage"/>
        Total: 000
      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
  import StuffHeader from './StuffHeader';
  import StuffItem from './StuffItem';
  import StuffPagination from './StuffPagination';
  import stuff from '../../server/test.json';

  export default {
    name: 'HelloWorld',
    components: {
      StuffHeader,
      StuffItem,
      StuffPagination,
    },
    data: () => ({
      stuff,
      advancedSearchOpen: false,
      activeFilter: 'Global',
      filterOptions: {
        global: 'Global',
        name: 'Name',
        location: 'Location',
        currency: 'Currency',
      },
      activePage: 1,
      itemsPerPage: 10,
    }),
    computed: {
      tableData() {
        return this.stuff
          .slice((this.activePage - 1) * this.itemsPerPage, this.activePage * this.itemsPerPage);
      },
    },
    methods: {
      activateFilter(value) {
        this.activeFilter = value;
        this.advancedSearchOpen = false;
      },
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
