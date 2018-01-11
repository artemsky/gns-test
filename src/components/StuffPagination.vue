<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center mb-0">
      <li class="page-item" :class="{'disabled': !prev}">
        <a class="page-link" href="#" tabindex="-1" @click.prevent="changePage(-1)">Previous</a>
      </li>
      <!--<li class="page-item disabled"><a class="page-link" href="#">1</a></li>-->
      <!--<li class="page-item"><a class="page-link" href="#">2</a></li>-->
      <!--<li class="page-item"><a class="page-link" href="#">3</a></li>-->
      <li class="page-item" :class="{'disabled': !next}">
        <a class="page-link" href="#" @click.prevent="changePage(1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'stuff-pagination',
  props: [
    'value',
    'totalCount',
  ],
  data: () => ({
    prev: false,
    next: true,
  }),
  methods: {
    changePage(step) {
      const nextValue = this.value + step;
      if (nextValue > 0 && nextValue <= this.totalCount) {
        this.$emit('input', this.value + step);
        this.prev = true;
        this.next = true;
      }

      if (nextValue === 1) {
        this.prev = false;
        this.next = true;
      } else if (nextValue === this.totalCount) {
        this.prev = true;
        this.next = false;
      }
    },
  },
};
</script>

<style>

</style>
