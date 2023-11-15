<script setup>
import { Icon } from "@iconify/vue";

import { reactive } from "vue";

const props = defineProps({
  personagem: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  coresOlho: {
    "blue": "Azul",
    "red": "Vermelho",
    "black": "Preto",
    "yellow": "Amarelo",
    "blue-gray": "Azul-cinza",
    "brown": "Castanho",
    "orange": "Laranja",
    "hazel": "Avelã",
    "pink": "Rosa",
    "unknown": "Desconhecido",
    "red, blue": "Vermelho + Azul",
    "gold": "Ouro",
    "green, yellow": "Verde + Amarelo",
    "white": "Branco",
  },
  generos: {
    "hermaphrodite": "Hermafrodita",
    "female": "Feminino",
    "male": "Masculino",
    "none": "Nenhum",
    "n/a": "n/a",
  },
  iconGenero: {
    "hermaphrodite": "tabler:gender-hermaphrodite",
    "female": "tabler:gender-female",
    "male": "tabler:gender-male",
    "none": "tabler:gender-epicene",
    "n/a": "mdi:null-off",
  },
});

const getCorOlho = (value) => {
  if (value) return state.coresOlho[value];
};

const getGenderIcon = (value) => {
  if (value) return state.iconGenero[value];
};

const getGenero = (value) => {
  if (value) return state.generos[value];
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog">
        <header class="modal-header">
          <div name="header">
            {{ personagem?.name }}
          </div>
          <button
            type="button"
            class="btn-close"
            @click="$emit('close')"
            aria-label="Close modal">
            x
          </button>
        </header>

        <section class="modal-body">
          <div name="body">
            <div>
              <div class="subtitle">
                <Icon icon="iwwa:year" />
                <div class="item">Ano de nascimento:</div>
              </div>
              <div class="item">{{ personagem.birth_year }}</div>
            </div>
            <div>
              <div class="subtitle">
                <Icon :icon="getGenderIcon(personagem.gender)" />
                <div>Gênero</div>
              </div>
              <div class="gender-text item">
                {{ getGenero(personagem.gender) }}
              </div>
            </div>
            <div>
              <div class="subtitle">
                <Icon icon="tabler:eye" />
                <div>Color dos olhos</div>
              </div>
              <div class="item">{{ getCorOlho(personagem.eye_color) }}</div>
            </div>
            <div>
              <div class="subtitle">
                <Icon icon="fontisto:film" />
                <div>Filmes</div>
              </div>
              <div class="item">
                <ul v-for="filme in personagem.films">
                  {{ filme.title }} - {{ filme.release_date }}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn"
            @click="$emit('close')">
            Fechar
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  min-width: 400px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #ffe81f;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;

  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #ffe81f;
  background: transparent;
}

.btn {
  height: 30px;
  font-weight: bold;
  background: #ffe81f;
  border: 1px solid #ffe81f;
  border-radius: 4px;
  cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.gender-text {
  text-transform: capitalize;
}

.subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;

  :last-child {
    margin-left: 6px;
    font-weight: bold;
  }
}

.item {
  text-align: center;
  text-transform: capitalize;
}
</style>
