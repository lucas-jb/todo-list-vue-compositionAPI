<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <Btn variant="danger" @click="$emit('close')" class="close-alert">&times;</Btn>
  </div>
</template>

<script>
import Btn from "./Btn.vue";

export default {
  components: {
    Btn,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: "danger",
      validator(value) {
        return ["danger", "warning", "info"].includes(value);
      },
    },
  },

  computed: {
    backgroundColor() {
      const options = {
        danger: "var(--danger-color)",
        warning: "var(--warning-color)",
        info: "var(--info-color)",
      };

      return options[this.variant];
    },
  },

  emits: ["close"],
};
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
