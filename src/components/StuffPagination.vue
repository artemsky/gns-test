<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center mb-0">
      <li class="page-item" :class="{'disabled': !prev}">
        <a class="page-link" href="#" tabindex="-1" @click.prevent="changePage(-1)">Previous</a>
      </li>
      <li class="page-item disabled"><span class="page-link">{{page}} / {{pagesCount}}</span></li>
      <!--<li class="page-item"><a class="page-link" href="#">2</a></li>-->
      <!--<li class="page-item"><a class="page-link" href="#">3</a></li>-->
      <li class="page-item" :class="{'disabled': !next}">
        <a class="page-link" href="#" @click.prevent="changePage(1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { GET_STUFF_PAGES_COUNT, GET_CURRENT_PAGE } from '../store/getters.type';
  import { CHANGE_PAGE } from '../store/actions.type';

  export default {
    name: 'stuff-pagination',
    data: () => ({
      prev: false,
      next: true,
    }),
    computed: {
      ...mapGetters({
        pagesCount: GET_STUFF_PAGES_COUNT,
        page: GET_CURRENT_PAGE,
      }),
    },
    methods: {
      changePage(step) {
        const nextValue = this.page + step;
        if (nextValue > 0 && nextValue <= this.pagesCount) {
          this.$store.dispatch(CHANGE_PAGE, nextValue);
          this.prev = true;
          this.next = true;
        }

        if (nextValue === 1) {
          this.prev = false;
          this.next = true;
        } else if (nextValue === this.pagesCount) {
          this.prev = true;
          this.next = false;
        }
      },
    },
  };
</script>

<style>

</style>
