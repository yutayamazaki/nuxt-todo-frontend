// 複数のvueファイル間で保持する共通のデータ
export const state = () => ({
  todoItems: [
    { id: 1, task: '掃除する', detail: '部屋の掃除を本日中にやる', state: '未着手' },
    { id: 2, task: '掃除する', detail: '部屋の掃除を本日中にやる', state: '未着手' },
    { id: 3, task: '掃除する', detail: '部屋の掃除を本日中にやる', state: '未着手' },
    { id: 4, task: '掃除する', detail: '部屋の掃除を本日中にやる', state: '未着手' },
    { id: 5, task: '掃除する', detail: '部屋の掃除を本日中にやる', state: '未着手' },
    { id: 6, task: '掃除する', detail: '部屋の掃除を本日中にやる', state: '未着手' }
  ]
});

// stateの値を変更するときはmutationsの関数を経由する
export const mutations = {
  addTodoItems(state, todo) {
    const id = state.todoItems.length + 1 // 既存のTodoの数+1
    todo.id = id;
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
  }
};

// vueファイルから共通の処理を呼び出す
export const actions = {
  addTodoItems({ commit }, todo) {
    commit('addTodoItems', todo);
  },
  deleteTodoItem({ commit }, id) {
    commit('deleteTodoItem', id);
  }
};
