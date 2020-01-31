<template>
    <v-card
        v-if="uncompletedTodos.length"
        raised
        class="mt-5"
    >

        <div class="d-flex justify-space-between align-center pa-3">
            <span class="font-weight-bold">TODOS</span>
            <v-chip
                outlined
                small
            >
                {{ uncompletedTodos.length }}
            </v-chip>
        </div>

        <v-divider></v-divider>
        
        <div class="px-3 pt-3">
            <div
                v-for="todo in uncompletedTodos"
                :key="todo.id"
                class="d-flex justify-space-between align-center mb-4"
            >
                <div class="d-flex flex-column">
                    <div>{{ todo.todo }}</div>
                    <div class="caption font-weight-thin">
                        Created at {{ todo.createdAt | moment("MMMM Do") }}
                    </div>
                </div>

                <v-btn
                    icon
                    fab
                    x-small
                    title="Mark as completed"
                    color="success"
                    @click="toggleCompleted(todo.id)"
                >
                    <v-icon>mdi-check</v-icon>
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    methods: {
        toggleCompleted: function (todoID) {
            this.$store.commit('toggle_completed', todoID);
        }
    },
    computed: {
        ...mapState({
            todos: state => state.todos
        }),
        uncompletedTodos: function () {
            return this.todos.filter(todo => todo.completed == false);
        },
    }
}
</script>