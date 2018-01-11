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
              <stuff-item v-for="item in stuff" :item="item"/>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer text-muted text-right">
        Total: 000
      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
  import StuffHeader from './StuffHeader';
  import StuffItem from './StuffItem';
  import stuff from '../../server/test.json';

  export default {
    name: 'HelloWorld',
    components: {
      StuffHeader,
      StuffItem,
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
    }),
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
