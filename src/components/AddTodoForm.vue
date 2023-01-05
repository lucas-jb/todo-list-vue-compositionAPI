<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Todo title" />
    <div>
      <Btn :disabled="isLoading" class="btn" @click="$emit('submit', todoTitle)">
      <Spinner v-if="isLoading"></Spinner>
      <span v-else>Add Todo</span>
      </Btn>
    </div>
  </form>
</template>

<script>
import Btn from "./Btn.vue";
import Spinner from "./Spinner.vue";
export default {
  components: {
    Btn,
    Spinner,
  },
  props : {
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      todoTitle: "",
    };
  },
  emits: ["submit"],
};
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
