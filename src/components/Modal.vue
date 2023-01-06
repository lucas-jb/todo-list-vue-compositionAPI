<template>
  <div ref="modal" v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
      </div>

      <div class="modal-body">
        <slot name="content"></slot>
      </div>

      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const modal = ref(null);
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
const clickListener = (e) => {
  if (e.target === modal.value) {
    emit("close");
    console.log(e);
  }
};
const closeOnEscapeListener = (e) => {
  if (e.key === "Escape") {
    emit("close");
  }
};
const submitOnEnterListener = (e) => {
  if (e.key === "Enter") {
    emit("submit");
  }
};
const emit = defineEmits(["close", "submit"]);

onMounted(() => {
  window.addEventListener("click", clickListener);
  window.addEventListener("keydown", closeOnEscapeListener);
  window.addEventListener("keydown", submitOnEnterListener);
})

onBeforeUnmount(() => {
  window.removeEventListener("click", clickListener);
  window.removeEventListener("keydown", closeOnEscapeListener);
  window.removeEventListener("keydown", submitOnEnterListener);
})

</script>

<style scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: var(--navbar-color);
  margin: auto;
  padding: 0;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
.modal-header {
  padding: 2px 16px;
  background-color: var(--background-color);
  color: white;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 2px 16px;
  background-color: var(--background-color);
  color: white;
}
</style>
