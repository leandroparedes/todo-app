<template>
    <v-container class="d-flex flex-column justify-center">

        <div class="text-center title font-weight-light my-4">
            {{ Date.now() | moment("dddd, MMMM Do YYYY") }}
        </div>

        <todo-input />

        <uncompleted-todos-list />

        <completed-todos-list />

    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import TodoInput from '@/components/TodoInput.vue';
import UncompletedTodosList from '@/components/UncompletedTodosList.vue';
import CompletedTodosList from '@/components/CompletedTodosList.vue';

export default {
    components: {
        TodoInput,
        UncompletedTodosList,
        CompletedTodosList
    }
}
</script>