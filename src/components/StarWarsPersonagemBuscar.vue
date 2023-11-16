<script setup>
import { ref } from "vue";

import { Icon } from "@iconify/vue";

const props = defineProps({
  fetchingData: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["buscar-personagem", "update-list"]);
const search = ref("");

const buscarPersonagem = () => {
  emit("buscar-personagem", search.value);
};
</script>

<template>
  <div class="input-wrap">
    <button
      class="reload"
      @click="emit('update-list')"
      :disabled="fetchingData"
    >
      <Icon icon="ion:reload" width="32" height="32" />
    </button>
    <input
      type="text"
      v-on:keyup="buscarPersonagem"
      v-model="search"
      placeholder="luke, Darth, Lars"
      name="search" 
      id="search"
    />
    <button class="button" @click="buscarPersonagem">BUSCAR</button>
  </div>
</template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 500ms ease;
  border: 2px solid #ffe81f;

  input {
    width: 100%;
    padding: 10px 4px;
    text-indent: 6px;
  }

  .button {
    background-color: #000;
    color: #ffe81f;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }

  .reload {
    padding: 4px;
  }
}
</style>
