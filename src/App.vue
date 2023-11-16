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
@import url("https://fonts.googleapis.com/css?family=Rubik");

@font-face {
  font-family: "Starjedi";
  src: url("./assets/fonts/StarJedi.eot");
  src: url("./assets/fonts/StarJedi.eot?#iefix") format("embedded-opentype"),
    url("./assets/fonts/StarJedi.woff2") format("woff2"),
    url("./assets/fonts/StarJedi.woff") format("woff"),
    url("./assets/fonts/StarJedi.ttf") format("truetype"),
    url("./assets/fonts/StarJedi.svg#StarJedi") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fffef7;
  user-select: none;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
