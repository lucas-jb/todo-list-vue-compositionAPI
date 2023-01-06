<template>
  <Navbar />

  <main class="container">
    <RouterView />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
