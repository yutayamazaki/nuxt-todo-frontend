// 複数のvueファイル間で保持する共通のデータ
export const state = () => ({
  todoItems: []
});

// stateの値を変更するときはmutationsの関数を経由する
export const mutations = {
  addTodoItems(state, todo) {
    state.todoItems.push(todo);
  },
  deleteTodoItem(state, id) {
    const newTodoItems = [];
    for (const todo of state.todoItems) {
      if (todo.id === id) {
        continue
      }
      newTodoItems.push(todo);
    }
    state.todoItems = newTodoItems;
  },
  updateTodoItem(state, todo) {
    // 更新したデータをstate.todoItemsに反映させる
    const id = todo.id;
    const newTodoItems = [];
    for (const item of state.todoItems) {
      if (item.id === id) {
        newTodoItems.push(todo);
        continue;
      }
      newTodoItems.push(item);
    }
    state.todoItems = newTodoItems;
  },
  // Djangoから受け取ったデータをtodoの一覧としてVuexに保存する
  setTodoItems(state, todoItems) {
    state.todoItems = todoItems;
  }
};

// vueファイルから共通の処理を呼び出す
export const actions = {
  // 新規レコード作成の処理をDjangoにリクエストする
  async addTodoItems({ commit }, todo) {
    const postItem = await this.$axios.post('/todo/create/', todo);
    commit('addTodoItems', postItem.data);
  },
  async deleteTodoItem({ commit }, id) {
    // http://localhost:8000/todo/delete/<id>を実行してDBのレコードを削除する
    await this.$axios.delete(`/todo/delete/${id}`);
    commit('deleteTodoItem', id);
  },
  // actionsでvueファイルからdipatchで呼ばれる関数
  async updateTodoItem({ commit }, item) {
    const id = item.id;  // idを取り出す
    // Djangoのhttp://localhost:8000/todo/update/を呼び出してDBを更新する
    const updatedItem = await this.$axios.put(`/todo/update/${id}/`, item);
    // 更新した結果をNuxt.jsのデータに反映する
    commit('updateTodoItem', updatedItem.data);
  },
  async fetchTodoItems({ commit }) {
    // Djangoのhttp://localhost:8000/todo/todos/にTodoの一覧を取得するリクエストを送信
    const todoItems = await this.$axios.get('/todo/todos/');
    console.log(todoItems.data);
    commit('setTodoItems', todoItems.data);
  }
};
