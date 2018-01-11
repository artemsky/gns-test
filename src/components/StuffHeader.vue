<template>
  <div class="card-header text-right">
    <div class="input-group">
      <input type="text" class="form-control from-control-sm" aria-label="Search block" placeholder="Search...">
      <div class="input-group-append" :class="{'show': advancedSearchOpen}">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" aria-haspopup="true" @click="advancedSearchOpen = !advancedSearchOpen">
          <i class="fa fa-cogs"></i> {{activeFilter}}
        </button>
        <div class="dropdown-menu" :class="{'show': advancedSearchOpen}">
          <a class="dropdown-item" href="#" @click.prevent="activateFilter(value)" v-for="(value, key) in filterOptions" :key="key">{{value}}</a>
        </div>
      </div>
    </div>
    <!-- /.btn btn-primary -->
  </div>
</template>

<script>
  export default {
    name: 'stuff-header',
    data: () => ({
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

<style scoped>

</style>
