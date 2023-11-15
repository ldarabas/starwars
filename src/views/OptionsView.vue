<script setup>
import { inject } from "vue";

const globalConfig = inject("globalConfig");

const updateOptions = () => {
  localStorage.setItem("globalConfig", JSON.stringify(globalConfig.value));
};
</script>

<template>
  <div class="options">
    <h1 class="title">Defina suas preferências</h1>
    <div class="option">
      <label for="checkbox">
        <input
          type="checkbox"
          class="checkbox"
          v-model="globalConfig.carregando"
          v-on:change="updateOptions"
        />
        Exibir informação de carregamento
      </label>
    </div>
    <div class="option">
      <label for="checkbox">
        <input
          type="checkbox"
          class="checkbox"
          v-model="globalConfig.ordenar"
          v-on:change="updateOptions"
        />
        Exibir a lista em ordem alfabética
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 40px;
  font-family: "Starjedi", sans-serif;
  font-size: 20px;
  letter-spacing: 1px;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
}

label {
  font-family: "Starjedi", sans-serif;
}

.option {
  height: 40px;
  max-width: 400px;
}

.checkbox {
  width: 20px;
  height: 20px;
}
</style>
