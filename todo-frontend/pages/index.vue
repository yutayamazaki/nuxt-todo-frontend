<template>
  <div class="container">
    <div>
      <h1 class="title">
        <!-- 通常のHTMLとは異なりvueファイルでは{{ 変数名 }}でJavaScriptの変数の値をそのまま表示できる -->
        {{ title }}
      </h1>
      <h2 class="mb-30">タスクを管理します。</h2>
      <div>
        <div>
          <!-- タスク名を入力するinput -->
          <p>タスク名を入力</p>
          <input v-model="editTask" class="mb-8">
          <!-- 詳細を入力するinput -->
          <p>詳細を入力</p>
          <!-- v-model="変数名" で変数にそのデータを反映させる -->
          <input v-model="editDetail" class="mb-8">
        </div>
        <Button @click="addTodo" label="追加" class="mb-30" />

        <!-- v-ifで要素の表示・非表示を切り替える -->
        <div v-if="displayEdit" class="mb-30">
          <h3>タスクの編集</h3>
          <p>{{ editPlusOne }}番目の要素を編集します</p>
          <div>
            <p>タスク名</p>
            <input v-model="editItem.task">
            <p>詳細</p>
            <input v-model="editItem.detail">
          </div>
          <div>
            <button @click="submitEdit">保存</button>
            <button @click="cancelEdit">キャンセル</button>
          </div>
        </div>

        <div class="mb-30">
          <p class="mb-8">現在進行中のタスク</p>
          <table border="3" style="width: 100%;">
            <tr>
              <th>ID</th>
              <th>タスク名</th>
              <th>詳細</th>
              <th>編集</th>
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
                <td>
                  <Button @click="editTodo(idx)" label="編集" />
                  <delete-button @click="deleteTodo(idx)" label="削除" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/Button.vue';
import DeleteButton from '~/components/DeleteButton.vue';

export default {
  components: {
    Button,
    DeleteButton
  },
  data() {
    return {
      title: 'TODOアプリ',
      todoList: [
        { task: '掃除する', detail: '部屋の掃除を本日中にやる' },
        { task: '課題やる', detail: '線形代数の課題を今週中に' },
        { task: '寝る', detail: '8時間寝る' }
      ],
      // 編集用のdataを追加する
      editTask: '',
      editDetail: '',
      // 編集用のデータ
      editItem: {
        id: null, // 何番目の要素を編集するのか
        task: '', // 編集するタスク名
        detail: '' // 編集するタスク詳細
      },
      // trueで編集の要素が表示されて、falseで要素が表示されない
      displayEdit: false
    }
  },
  // 関数のように書いて変数のようにアクセスする
  // template内の{{ }}の表示をスッキリさせたい場合などで利用
  computed: {
    todoItems() {
      // store/todo.jsのtodoItemsを取り出す
      return this.$store.state.todo.todoItems;
    },
    editPlusOne() {
      return this.editItem.id + 1;
    }
  },
  // 必要な処理はmethodsに関数を記述してそれを利用する
  methods: {
    // todoリストの要素を追加する
    addTodo() {
      const todo = { task: this.editTask, detail: this.editDetail };
      this.todoList.push(todo);
      // 追加後にinputの中身を空にする
      this.editTask = '';
      this.editDetail = '';
    },
    // todoリストの要素を削除する
    deleteTodo(id) {
      // id番目の要素を削除
      // Array.splice(a, b)
      // a番目の要素からb個要素を取り出す
      this.todoList.splice(id, 1);
    },
    // id番目の要素を編集する
    editTodo(id) {
      // 編集のHTML要素を表示
      this.displayEdit = true;
      // 編集するtodoのタスク名と詳細をinputのデフォルト値に設定する
      this.editItem = {
        id: id,
        task: this.todoList[id].task,
        detail: this.todoList[id].detail
      }
    },
    // 編集をキャンセルする
    cancelEdit() {
      // 編集の要素を見えないようにする
      this.displayEdit = false;
    },
    // 編集結果を保存する
    submitEdit() {
      // 何番目の要素の変更を保存するか
      const id = this.editItem.id;
      // 変更されたtodoデータ
      const newTodo = {
        task: this.editItem.task,
        detail: this.editItem.detail
      }
      // id番目の要素を編集後のデータに変更する
      this.todoList[id] = newTodo;
      this.displayEdit = false; // 編集の要素を見えないように
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
</style>
