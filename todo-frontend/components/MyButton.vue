<template>
  <button @click="click" class="btn">{{ label }}</button>
</template>

<script>
export default {
  // 親コンポーネントから渡される値
  props: {
    label: { type: String, required: true }
  },
  methods: {
    click() {
      // 親コンポーネントの関数を実行する
      // this.$emit('関数名');
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
