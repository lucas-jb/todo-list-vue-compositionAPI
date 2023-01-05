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

<script>
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import Todo from "./components/Todo.vue";
import EditTodo from "./components/EditTodoForm.vue";
import Btn from "./components/Btn.vue";
import Spinner from "./components/Spinner.vue";
import axios from "axios";


export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    EditTodo,
    Btn,
    Spinner,
  },
  data() {
    return {
      todoTitle: "",
      todos: [],
      alert: {
        show: false,
        message: "",
        variant: "",
      },
      showEditTodoModal: false,
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: "",
        },
      },
      isLoading: false,
      buttonLoading: false,
    };
  },
  created() {
    this.fetchTodo();
  },
  methods: {
    async fetchTodo() {
      this.isLoading = true;
      try {
        const res = await axios.get("api/todos");
        this.todos = await res.data;
      } catch {
        this.showAlert("There was a problem loading todos");
      }
      this.isLoading = false;
    },
    showAlert(message, variant = "danger") {
      this.alert.message = message;
      this.alert.show = true;
      this.alert.variant = variant;
    },
    async addTodo(title) {
      this.buttonLoading = true;
      if (title !== "") {
        const res = await axios.post("api/todos", { title });
        this.todos.push(res.data);
      } else {
        this.showAlert("Todo title is required");
      }
      this.buttonLoading = false;
    },
    async removeTodo(todo) {
      await axios.delete(`api/todos/${todo.id}`);
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },

    showEditTodoForm(todo) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...todo };
    },

    async updateTodo() {
      try{
        await axios.put(`api/todos/${this.editTodoForm.todo.id}`, {
          title: this.editTodoForm.todo.title,
        });
      }catch{
        this.showAlert("There was a problem updating todo");
      }
      this.editTodoForm.show = false;
      this.fetchTodo();
    },
  },
};
</script>

<style scoped>

.todo-loading {
  margin-top: 30px;
}
</style>
