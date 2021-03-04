<template>
  <button @click="click" class="finish-btn">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true }
  },
  methods: {
    click() {
      this.$emit('click');
    }
  }
}
</script>

<style>
.finish-btn {
  background-color: #dc3545;
  border: 1px solid transparent;
  border-color: #dc3545;
  border-radius: .25rem;
  color: white;
  padding: .300rem .75rem;
  text-align: center;
  display: inline-block;
  font-size: 1rem;
  transition-duration: 0.4s;
  cursor: pointer;
}
.finish-btn:hover {
  background-color: #cc3040;
  color: white;
}
</style>
