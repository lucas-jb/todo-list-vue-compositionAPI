<template>
  <div class="todo">
    <p>{{ title }}</p>
    <div>
      <Btn class="todo-btn" circle variant="info" @click="$emit('edit', todo)">
        <Pencil />
      </Btn>
      <Btn class="todo-btn" circle variant="danger" @click="$emit('remove', todo)"
        ><Bin
      /></Btn>
    </div>
  </div>
</template>

<script setup>
import Btn from "./Btn.vue";
import Pencil from "./icons/Pencil.vue";
import Bin from "./icons/Bin.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["remove", "edit"]);

</script>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 20px;
}
.todo > div {
  display: flex;
}
.todo-btn {
  height: 40px;
  width: 40px;
  font-size: 30px;
}
</style>
