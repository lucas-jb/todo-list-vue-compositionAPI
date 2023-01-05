<template>
  <nav class="navbar">
    <img src="@/assets/mono.png" width="50" />
    <div class="brand">Todo list App</div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background: var(--navbar-color);
  padding: 20px;
  margin-bottom: 30px;
}
.brand {
  margin-left: 30px;
  font-size: 2rem;
}
</style>
