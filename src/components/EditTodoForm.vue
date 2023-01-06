<template>
  <Modal :show="show" @close="$emit('close')" @submit="$emit('submit')">
    <template #header>
      <h2>Edit Todo</h2>
    </template>

    <template #content>
      <form class="editTodoForm">
        <div>
          <label>Todo Title</label>
        </div>
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </form>
    </template>

    <template #footer>
      <div class="footer">
        <div class="infoModalFooter">
          <div>Esc to exit - Enter to submit</div>
        </div>
        <div class="editTodoModalFooter">
          <Btn variant="success" class="editTodoSubmitBtn" @click="$emit('submit')">Submit</Btn>
          <Btn variant="danger" @click="$emit('close')">Close</Btn>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "./Modal.vue";
import Btn from "./Btn.vue";

const props = defineProps(["show", "modelValue"]);

const emit = defineEmits(["submit", "close", "update:modelValue"]);
</script>

<style scoped>
.editTodoForm > input {
  width: 100%;
  height: 30px;
  border: 1px solid var(--accent-color);
}
.editTodoModalFooter {
  display: flex;
  justify-content: end;
  padding: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
}
.editTodoSubmitBtn {
  margin-right: 10px;
}
.infoModalFooter {
  display: flex;
  justify-content: start;
  padding: 30px;
  color: var(--text-color);
}
</style>
