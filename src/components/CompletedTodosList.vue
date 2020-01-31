<template>
    <v-card
        v-if="completedTodos.length"
        raised
        class="mt-5"
    >

        <div class="d-flex justify-space-between align-center px-3 pb-3 pt-2">
            <span class="green--text font-weight-bold">COMPLETED</span>
            <div>
                <v-btn
                    icon
                    color="success"
                    @click="showCompleted = !showCompleted"
                    :title="showCompleted ? 'Hide completed todos' : 'Show completed todos'"
                >
                    <v-icon>
                        {{ showCompleted ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}
                    </v-icon>
                </v-btn>

                <v-chip
                    outlined
                    small
                    color="green"
                    class="ml-2"
                >
                    {{ completedTodos.length }}
                </v-chip>
            </div>
        </div>

        <div v-if="showCompleted">
            
            <v-divider></v-divider>

            <div class="px-3 pt-3">
                <div
                    v-for="todo in completedTodos"
                    :key="todo.id"
                    class="d-flex justify-space-between align-center mb-4"
                >
                    <div class="d-flex flex-column">
                        <div>{{ todo.todo }}</div>
                        <div class="caption font-weight-thin">
                            Completed at {{ todo.completedAt | moment("MMMM Do") }}
                        </div>
                    </div>

                    <div class="d-flex">
                        <v-btn
                            icon
                            fab
                            x-small
                            title="Mark as uncompleted"
                            color="red"
                            @click="toggleCompleted(todo.id)"
                        >
                            <v-icon>mdi-redo-variant</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            fab
                            x-small
                            title="Delete this todo"
                            color="red"
                            @click="remove(todo.id)"
                        >
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>

            <v-divider></v-divider>

            <div class="d-flex justify-center my-3">
                <v-btn
                    small
                    color="error"
                    title="Delete all completed todos"
                    @click="removeAllCompleted"
                >
                    <v-icon class="mr-1">mdi-trash-can-outline</v-icon> Delete all completed
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data: function () {
        return {
            showCompleted: true
        };
    },
    methods: {
        toggleCompleted: function (todoID) {
            this.$store.commit('toggle_completed', todoID);
        },
        remove: function (todoID) {
            if (confirm('Delete this todo?')) {
                this.$store.commit('delete_todo', todoID);
            }
        },
        removeAllCompleted: function () {
            if (confirm('Delete all todos?')) {
                this.$store.commit('delete_completed_todos');
            }
        }
    },
    computed: {
        ...mapState({
            todos: state => state.todos
        }),
        completedTodos: function () {
            return this.todos.filter(todo => todo.completed == true);
        },
    }
}
</script>