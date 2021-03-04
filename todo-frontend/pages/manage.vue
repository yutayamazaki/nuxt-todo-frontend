<template>
  <div class="container">
    <div>
      <h1 class="title">
        <!-- 通常のHTMLとは異なりvueファイルでは{{ 変数名 }}でJavaScriptの変数の値をそのまま表示できる -->
        {{ title }}
      </h1>
      <div>
        <nuxt-link to="/">HOMEへ戻る</nuxt-link>
      </div>
      <div>
        <div class="mb-30">
          <table style="width: 100%;" class="todo-table">
            <tr>
              <th>ID</th>
              <th>タスク名</th>
              <th>詳細</th>
            </tr>
            <!--
              v-forで要素を繰り返し表示する設定を行なっている
              JavaScriptによるDOM操作と異なり、データが変われば自動で見た目も変わる。
            -->
            <tbody>
              <tr v-for="(todo, idx) in todoList" :key="idx">
                <td>{{ idx }}</td>
                <td>{{ todo.task }}</td>
                <td>{{ todo.detail }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'TODO管理',
      todoList: [
        { task: '掃除する', detail: '部屋の掃除を本日中にやる' },
        { task: '課題やる', detail: '線形代数の課題を今週中に' },
        { task: '寝る', detail: '8時間寝る' }
      ]
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  min-height: 100vh;
  text-align: center;
  padding: 40px;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
}
.flex {
  display: flex;
}
.mb-30 {
  margin-bottom: 30px;
}
.mb-8 {
  margin-bottom: 8px;
}

.todo-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.todo-table td, .todo-table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.todo-table tr:hover {
  background-color: #ddd;
}

.todo-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #007bff;
  color: white;
}

.todo-input {
  width: 30%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
}
</style>
