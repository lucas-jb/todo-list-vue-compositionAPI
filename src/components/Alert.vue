<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <Btn variant="danger" @click="close" class="close-alert">&times;</Btn>
  </div>
</template>

<script setup>
import Btn from "./Btn.vue";
import { useBackgroundColor, backgroundColorProps } from "../composables/backgroundColor";
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
  ...backgroundColorProps,
});

const emit = defineEmits(["close"]);

const backgroundColor = useBackgroundColor(props);

function close() {
  emit("close");
}
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 20px;
  height: 59px;
}
.close-alert {
  font-size: 50px;
  cursor: pointer;
}
</style>
