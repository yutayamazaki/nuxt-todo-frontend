<template>
  <button @click="click" class="btn">{{ label }}</button>
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
.btn {
  background-color: #007bff;
  border: 1px solid transparent;
  border-color: #007bff;
  border-radius: .25rem;
  color: white;
  padding: .300rem .75rem;
  text-align: center;
  display: inline-block;
  font-size: 1rem;
  transition-duration: 0.4s;
  cursor: pointer;
}
.btn:hover {
  background-color: #0367d3;
  color: white;
}
</style>
