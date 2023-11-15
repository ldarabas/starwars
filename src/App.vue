<script setup>
import { RouterView } from "vue-router";
import StarWarsHeader from "./components/StarWarsHeader.vue";
</script>

<script>
export default {
  setup() {},
};
</script>

<template>
  <StarWarsHeader />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");

@font-face {
  font-family: "Starjedi";
  src: local("Starjedi"), url("./assets/Starjedi.ttf"), format("truetype");
  font-weight: bold;
}

* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fffef7;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
