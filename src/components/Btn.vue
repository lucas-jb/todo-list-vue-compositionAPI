<template>
  <button
    :style="{ backgroundColor }"
    @click.prevent="$emit('click')"
    :class="{ circle: applyCircleClass }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
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
  },
  computed: {
    backgroundColor() {
      const options = {
        success: "var(--accent-color)",
        danger: "var(--danger-color)",
        warning: "var(--warning-color)",
        info: "var(--info-color)",
      };

      return options[this.variant];
    },
    applyCircleClass() {
      return this.circle;
    },
  },
  emits: ["click"],
};
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
