<template>
  <tr>
    <th scope="row">{{index}}</th>
    <td><stuff-input :value="item.name" @change="handleUpdate($event, 'name')" /></td>
    <td><stuff-input :value="item.location" @change="handleUpdate($event, 'location')" /></td>
    <td><stuff-input :value="item.currency" type="number" @change="handleUpdate($event, 'currency')" /></td>
  </tr>
</template>

<script>
  import StuffInput from './StuffInput';
  import { CHANGE_STUFF } from '../store/actions.type';

  export default {
    name: 'stuff-item',
    props: {
      item: Object,
      index: Number,
    },
    components: {
      StuffInput,
    },
    methods: {
      handleUpdate(value, field) {
        this.$store.dispatch(CHANGE_STUFF, {
          id: this.item.id,
          value,
          field,
        });
      },
    },
  };
</script>

