<template>
  <input
    class="border rounded-sm py px"
    :value="value"
    @input="$emit('input', $event.target.value)"
    v-on:keyup.enter="$emit('onEnter', $event.target.value)"
    :placeholder="$props.placeholder"
    :type="type"
  >
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: '' }
  }
}
</script>

<style scoped>
.border {
  border-width: 1px;
}
.rounded-sm {
  border-radius: 0.125rem;
}
.py {
	padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.px {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
