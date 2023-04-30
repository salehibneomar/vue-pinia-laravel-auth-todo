<template>
  <p>Loading</p>
</template>

<style scoped>
p {
  background-color: azure;
  text-align: center;
  padding: 5px 0;
  font-weight: 600;
  letter-spacing: 5px;
  border-radius: 5px;
}

p::after {
  content: '';
  animation: dott infinite ease-in-out 1s;
}

@keyframes dott {
  0% {
    content: '.';
  }
  50% {
    content: '..';
  }
  100% {
    content: '...';
  }
}
</style>
