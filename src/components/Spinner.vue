<template>
    <div class="spinner"></div>
</template>

<style scoped>
.spinner {
    border: 4px solid var(--navbar-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: var(--accent-color);
    margin: 0 auto;
  
    animation: spin 1s ease infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  
</style>