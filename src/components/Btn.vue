<template>
  <button
    :style="{ backgroundColor }"
    @click.prevent="$emit('click')"
    :class="{ circle: applyCircleClass }"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useBackgroundColor, backgroundColorProps } from "../composables/backgroundColor";

const props = defineProps({
  circle: {
    type: Boolean,
    required: false,
    default: false,
  },
  ...backgroundColorProps,
});

const backgroundColor = useBackgroundColor(props);

const applyCircleClass = computed(() => props.circle);

const emit = defineEmits(["click"]);
</script>

<style scoped>
button {
  color: var(--tex-color);
  height: 50px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
}
.circle {
  border-radius: 50%;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
