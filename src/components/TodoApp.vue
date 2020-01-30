<template>
    <v-container class="d-flex flex-column justify-center">

        <div class="text-center title font-weight-light my-4">
            {{ Date.now() | moment("dddd, MMMM Do YYYY") }}
        </div>

        <!-- input -->
        <v-card
            shaped
            raised
            class="px-4 py-3"
        >
            <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                autocomplete="off"
            >
                <v-text-field
                    v-model="todo"
                    :disabled="loading"
                    :rules="todoRules"
                    :counter="50"
                    label="What to do?"
                    required
                    v-on:keydown.enter.prevent="add"
                    autocomplete="off"
                ></v-text-field>
            </v-form>
        </v-card>

        <!-- uncompleted todos list -->
        <v-card
            v-if="uncompletedTodos.length"
            raised
            class="mt-4"
        >
            <v-list two-line subheader>
                <v-subheader class="d-flex justify-space-between align-center">
                    <span class="font-weight-bold">TODOS</span>
                    <v-chip
                        outlined
                        small
                    >
                        {{ uncompletedTodos.length }}
                    </v-chip>
                </v-subheader>

                <v-divider></v-divider>

                <v-list-item
                    v-for="todo in uncompletedTodos"
                    :key="todo.id"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ todo.todo }}</v-list-item-title>
                        <v-list-item-subtitle class="caption font-weight-thin">Added {{ todo.createdAt | moment("DD-MM-YYYY") }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn
                            icon
                            fab
                            x-small
                            title="Mark as completed"
                            color="success"
                            @click="toggleCompleted(todo.id)"
                        >
                            <v-icon color="green lighten-1">mdi-check</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>

        <!-- completed todos list -->
       <v-card
            v-if="completedTodos.length"
            raised
            class="mt-4"
        >
            <v-list two-line subheader>
                <v-subheader class="d-flex justify-space-between align-center">
                    <span class="green--text font-weight-bold">COMPLETED</span>
                    <div>
                        <v-chip
                            outlined
                            small
                            color="green"
                        >
                            {{ completedTodos.length }}
                        </v-chip>
                        <v-btn
                            icon
                            color="success"
                            class="ml-2"
                            @click="showCompleted = !showCompleted"
                            :title="showCompleted ? 'Hide completed todos' : 'Show completed todos'"
                        >
                            <v-icon>
                                {{ showCompleted ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}
                            </v-icon>
                        </v-btn>
                    </div>
                </v-subheader>

                <div v-if="showCompleted">
                    <v-divider></v-divider>

                    <v-list-item
                        v-for="todo in completedTodos"
                        :key="todo.id"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ todo.todo }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-thin">Completed {{ todo.completedAt | moment("DD-MM-YYYY") }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action class="d-flex flex-row">
                            <v-btn
                                icon
                                fab
                                x-small
                                title="Mark as uncompleted"
                                color="red"
                                @click="toggleCompleted(todo.id)"
                            >
                                <v-icon color="red lighten-1">mdi-redo-variant</v-icon>
                            </v-btn>

                            <v-btn
                                icon
                                fab
                                x-small
                                title="Delete this todo"
                                color="red"
                                @click="remove(todo.id)"
                            >
                                <v-icon color="red lighten-1">mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>
                    <div class="d-flex justify-center mt-4 mb-2">
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
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data: function () {
        return {
            todo: '',
            valid: true,
            lazy: false,
            todoRules: [
                v => !!v,
                v => v.length <= 50
            ],
            loading: false,
            showCompleted: false
        };
    },
    methods: {
        add: function () {
            this.loading = true;

            if (this.$refs.form.validate()) {

                const todo = {
                    id: this.$uuid.v1(),
                    todo: this.todo,
                    completed: false,
                    createdAt: Date.now()
                };

                this.$store.commit('add_todo', todo);

                this.todo = '';
            }

            this.loading = false;
        },
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
        uncompletedTodos: function () {
            return this.todos.filter(todo => todo.completed == false);z
        }
    }
}
</script>