<template>
  <tr>
    <th scope="row">{{index}}</th>
    <td>{{item.name}}</td>
    <td>{{item.location}}</td>
    <td>{{item.currency}}</td>
  </tr>
</template>

<script>
export default {
  name: 'stuff-item',
  props: [
    'item',
    'index',
  ],
  data: () => ({
    //
  }),
};
</script>

<style>

</style>
