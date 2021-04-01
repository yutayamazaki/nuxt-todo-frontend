<template>
  <div class="bg-gray">
    <div class="container">
      <div class="w-03 p-8 bg-white rounded shadow">
        <h2>Todoアプリ</h2>
        <div class="text-left mt-4">
          <label>メールアドレス</label>
        </div>
        <atom-input v-model="userName" class="w-full text-md" />
        <div class="text-left mt-2">
          <label>パスワード</label>
        </div>
        <atom-input
          v-model="password"
          class="w-full  text-md"
          type="password"
        />
        <button
          @click="login"
          class="bg-green text-md font-bold py-2 px-2 text-white rounded-md w-full mt-4 border-none"
        >ログイン</button>
      </div>
    </div>
  </div>
</template>

<script>
import AtomInput from '~/components/AtomInput.vue';

export default {
  components: {
    AtomInput
  },
  layout: 'login',
  data() {
    return {
      userName: '',
      password: '',
      message: '',
      loginError: false
    }
  },
  methods: {
    login() {
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style scoped>
.rounded-md {
  border-radius: 0.375rem;
}
.rounded {
  border-radius: 1rem;
}
.shadow {
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.text-md {
  font-size: 1rem;
  line-height: 1rem;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
	margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
}
.p-8 {
	padding: 2rem;
}
.w-03 {
  width: 33.333333%;
}
.py-2 {
	padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-4 {
  margin-top: 1rem;
}
.w-full {
  width: 100%;
}
.min-w-full {
	min-width: 100%;
}
.font-bold {
  font-weight: bold;
}
.border-none {
  border: none;
}
</style>
