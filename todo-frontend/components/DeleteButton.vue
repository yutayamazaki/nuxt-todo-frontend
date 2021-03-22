<template>
  <button @click="click" class="delete-btn">{{ label }}</button>
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
.delete-btn {
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
.delete-btn:hover {
  background-color: #cc3040;
  color: white;
}
</style>
