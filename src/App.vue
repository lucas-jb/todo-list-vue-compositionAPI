<template>
  <Navbar />

  <main class="container">
    <EditTodo
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @submit="updateTodo"
      v-model="editTodoForm.todo.title"
    />
    <Alert
      :message="alert.message"
      :show="alert.show"
      @close="alert.show = false"
      :variant="alert.variant"
    />

    <section>
      <AddTodoForm :isLoading="buttonLoading" @submit="addTodo" />
    </section>

    <section>
      <Spinner class="todo-loading" v-if="isLoading" />

      <div v-else>
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :title="todo.title"
          :inputTitle="todoTitle"
          @remove="removeTodo(todo)"
          @edit="showEditTodoForm(todo)"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import Todo from "./components/Todo.vue";
import EditTodo from "./components/EditTodoForm.vue";
import Spinner from "./components/Spinner.vue";
import axios from "axios";
import { ref, reactive, watch } from "vue";
import { useFetch } from "./composables/fetch";

const todoTitle = ref("");
const alert = reactive({
  show: false,
  message: "",
  variant: "",
});
const buttonLoading = ref(false);
const editTodoForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: "",
  },
});

const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: () => {
    showAlert("Failed loading todos");
  },
});

function showEditTodoForm(todo) {
  editTodoForm.show = true;
  editTodoForm.todo = { ...todo };
}

function showAlert(message, variant = "danger") {
  alert.message = message;
  alert.show = true;
  alert.variant = variant;
}



async function addTodo(title) {
  buttonLoading.value = true;
  if (title !== "") {
    const res = await axios.post("api/todos", { title });
    todos.value.push(res.data);
  } else {
    showAlert("Todo title is required");
  }
  buttonLoading.value = false;
}

async function removeTodo(todo) {
  await axios.delete(`api/todos/${todo.id}`);
  todos.value = todos.value.filter((t) => t.id !== todo.id);
}

async function updateTodo() {
  try {
    await axios.put(`api/todos/${editTodoForm.todo.id}`, {
      title: editTodoForm.todo.title,
    });
    
    const todo = todos.value.find(
      (todo) => todo.id === editTodoForm.todo.id
    );

    todo.title = editTodoForm.todo.title;

  } catch {
    showAlert.value("There was a problem updating todo");
  }
  editTodoForm.show = false;
  fetchTodo();
}
</script>

<style scoped>
.todo-loading {
  margin-top: 30px;
}
</style>
