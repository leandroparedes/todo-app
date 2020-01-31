<template>
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
</template>

<script>
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
    }
}
</script>