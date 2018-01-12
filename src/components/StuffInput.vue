<template>
  <input :value="value" class="form-control" :readonly="!isEnabled" @click="isEnabled = true" @blur="isEnabled = false" @change="valueChanged" :type="type">
</template>

<script>
export default {
  name: 'stuff-input',
  props: {
    value: [String, Number],
    id: String,
    type: {
      type: String,
      default: 'text',
    },
  },
  data: () => ({
    isEnabled: false,
  }),
  methods: {
    valueChanged(event) {
      let value = event.target.value;
      if (event.target.type === 'number') {
        value = +value;
      }
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
  input[readonly] {
    background: transparent;
    border-color: transparent;
    &:hover {
      cursor: pointer;
    }
  }
  th {
    vertical-align: middle;
  }
</style>
