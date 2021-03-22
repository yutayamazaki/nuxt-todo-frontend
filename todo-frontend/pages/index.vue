<template>
  <div class="container">
    <div>
      <h1 class="title">
        <!-- 通常のHTMLとは異なりvueファイルでは{{ 変数名 }}でJavaScriptの変数の値をそのまま表示できる -->
        {{ title }}
      </h1>
      <h2>タスクを管理します。</h2>
      <div>
        <div>
          <!-- タスク名を入力するinput -->
          <p>タスク名を入力</p>
          <input class="todo-input mb-8" v-model="editTask">
          <!-- 詳細を入力するinput -->
          <p>詳細を入力</p>
          <!-- v-model="変数名" で変数にそのデータを反映させる -->
          <input class="todo-input mb-8" v-model="editDetail">
          <p>状態を選択</p>
          <select v-model="editState">
            <option
              v-for="(state, idx) in stateList"
              :key="idx"
            >
              {{ state }}
            </option>
          </select>
        </div>
        <my-button @click="addTodo" label="追加" class="mb-30" />

        <!-- v-ifで要素の表示・非表示を切り替える -->
        <div v-if="displayEdit" class="mb-30">
          <h3>タスクの編集</h3>
          <p>{{ editPlusOne }}番目の要素を編集します</p>
          <div>
            <p>タスク名</p>
            <input class="todo-input mb-8" v-model="editItem.task">
            <p>詳細</p>
            <input class="todo-input mb-8" v-model="editItem.detail">
            <p>状態</p>
            <select v-model="editItem.state">
              <option
                v-for="(state, idx) in stateList"
                :key="idx"
              >
                {{ state }}
              </option>
            </select>
          </div>
          <div>
            <my-button @click="submitEdit" label="保存" />
            <cancel-button @click="cancelEdit" label="キャンセル" />
          </div>
        </div>

        <table class="todo-table">
          <tr>
            <th>ID</th>
            <th>タスク名</th>
            <th>詳細</th>
            <th>状態</th>
            <th>編集</th>
          </tr>
          <!--
            v-forで要素を繰り返し表示する設定を行なっている
            JavaScriptによるDOM操作と異なり、データが変われば自動で見た目も変わる。
          -->
          <tbody>
            <tr v-for="(todo, idx) in todoItems" :key="idx">
              <td>{{ todo.id }}</td>
              <td>{{ todo.task }}</td>
              <td>{{ todo.detail }}</td>
              <td>{{ todo.state }}</td>
              <td>
                <!-- <my-button @click="editTodo(idx)" label="編集" /> -->
                <my-button @click="editTodo(todo.id)" label="編集" />
                <delete-button @click="deleteTodo(todo.id)" label="削除" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import CancelButton from '~/components/CancelButton.vue';
import DeleteButton from '~/components/DeleteButton.vue';
import MyButton from '~/components/MyButton.vue';

export default {
  // このvueファイルで使用する
  // components(vueファイル)を指定する
  components: {
    CancelButton,
    DeleteButton,
    MyButton
  },
  data() {
    return {
      title: 'TODOアプリ',
      todoList: [
        { task: '掃除する', detail: '部屋の掃除を本日中にやる', state: '未着手' },
        { task: '課題やる', detail: '線形代数の課題を今週中に', state: '作業中' },
        { task: '寝る', detail: '8時間寝る', state: '完了' }
      ],
      // 追加用のdataを追加する
      editTask: '',
      editDetail: '',
      editState: '未着手', // 状態を追加
      // 編集用のデータ
      editItem: {
        id: null, // 何番目の要素を編集するのか
        task: '', // 編集するタスク名
        detail: '', // 編集するタスク詳細
        state: '' // 編集する状態
      },
      // trueで編集の要素が表示されて、falseで要素が表示されない
      displayEdit: false,
      // 状態の選択肢
      stateList: ['未着手', '作業中', '完了']
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
      const todo = {
        task: this.editTask,
        detail: this.editDetail,
        state: this.editState
      };
      // dispatchでactionsを呼び出す 'storeのファイル名/actionの名前'
      this.$store.dispatch('todo/addTodoItems', todo);
      // 追加後にinputの中身を空にする
      this.editTask = '';
      this.editDetail = '';
    },
    // todoリストの要素を削除する
    deleteTodo(id) {
      this.$store.dispatch('todo/deleteTodoItem', id);
    },
    // id番目の要素を編集する
    editTodo(id) {
      // 編集のHTML要素を表示
      this.displayEdit = true;
      // 編集するtodoのタスク名と詳細をinputのデフォルト値に設定する
      this.editItem = {
        id: id,
        task: this.todoList[id].task,
        detail: this.todoList[id].detail,
        state: this.todoList[id].state
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
        detail: this.editItem.detail,
        state: this.editItem.state
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

.todo-input {
  width: 30%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
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

.mb-8 {
  margin-bottom: 8px;
}
.mb-30 {
  margin-bottom: 30px;
}
</style>
