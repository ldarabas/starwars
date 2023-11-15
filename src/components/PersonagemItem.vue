<script setup>
const emit = defineEmits(["show-more"]);

const props = defineProps({
  personagem: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div @click="$emit('show-more', personagem)">
    <h1 class="nome">{{ personagem.name }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.nome {
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 10px;
}
</style>
