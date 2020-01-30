import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        todos: []
    },
    mutations: {
        add_todo (state, todo) {
            state.todos.push(todo);
        },
        toggle_completed (state, todoID) {
            let todo = state.todos.find(todo => todo.id == todoID);
            todo.completed = !todo.completed;
            todo.completedAt = todo.completed ? Date.now() : null;
        },
        delete_todo (state, todoID) {
            state.todos = state.todos.filter(todo => todo.id != todoID);
        }
    },
    actions: {
    },
    modules: {
    }
});
