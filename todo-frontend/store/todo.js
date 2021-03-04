// 複数のvueファイル間で保持する共通のデータ
export const state = () => ({
  todoItems: [
    { task: '掃除する', detail: '部屋の掃除を本日中にやる' }
  ]
});

// stateの値を変更するときはmutationsの関数を経由する
export const mutations = {
  addTodoItems(state, todo) {
    state.todoItems.push(todo);
  }
};

// vueファイルから共通の処理を呼び出す
export const actions = {
  addTodoItems({ commit }, todo) {
    commit('addTodoItems', todo);
  }
};
