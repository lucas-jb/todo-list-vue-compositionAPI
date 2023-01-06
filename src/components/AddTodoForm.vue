<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Todo title" />
    <div>
      <Btn
        :disabled="isLoading"
        class="btn"
        @click="submitTodo"
      >
        <Spinner v-if="isLoading"></Spinner>
        <span v-else>Add Todo</span>
      </Btn>
    </div>
  </form>
</template>

<script setup>
import Btn from "./Btn.vue";
import Spinner from "./Spinner.vue";
import { ref } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const todoTitle = ref("");

function submitTodo() {
  emit("submit", todoTitle.value);
}
</script>

<style scoped>
.add-todo-form {
  display: flex;
  justify-content: space-between;
}
.add-todo-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}
.btn {
  height: 50px;
  border-radius: 10%;
}
</style>
