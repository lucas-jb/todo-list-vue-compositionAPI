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

const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: "success",
    validator(value) {
      return ["success", "danger", "warning", "info"].includes(value);
    },
  },
  circle: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const backgroundColor = computed(() => {
  const options = {
    success: "var(--accent-color)",
    danger: "var(--danger-color)",
    warning: "var(--warning-color)",
    info: "var(--info-color)",
  };

  return options[props.variant];
});

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
