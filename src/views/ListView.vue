<script setup>
import { reactive, inject } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import StarWarsPersonagemBuscar from "../components/StarWarsPersonagemBuscar.vue";
import PersonagemItem from "../components/PersonagemItem.vue";
import Modal from "../components/Modal.vue";
import axios from "axios";
import { Icon } from "@iconify/vue";
import { format, parseISO } from "date-fns";

function createState() {
  return reactive({
    people: [],
    films: [],
    pessoasFiltradas: [],
    isFetching: false,
    isModalVisible: false,
    searchAtual: "",
    personagemSelecionado: {},
  });
}

const globalConfig = inject("globalConfig");

function loadGlobalConfig() {
  if (localStorage.getItem("globalConfig"))
    globalConfig.value = JSON.parse(localStorage.getItem("globalConfig"));
}

const state = createState();

const axiosSource = axios.CancelToken.source();

loadGlobalConfig();

onBeforeRouteLeave(() => {
  axiosSource.cancel();
});

async function getFilms() {
  state.isFetching = true;
  try {
    const res = await axios.get("https://swapi.dev/api/films/", {
      cancelToken: axiosSource.token,
    });
    state.films = res.data.results;
    await fetchData("https://swapi.dev/api/people/");
  } catch (error) {
    state.isFetching = false;
  }
}

async function fetchData(url) {
  try {
    const res = await axios.get(url, { cancelToken: axiosSource.token });
    const {
      data: { next, results },
    } = res;
    results.forEach((result) => {
      result.films = result.films.map((filmUrl) => {
        const film = state.films.find((film) => film.url === filmUrl);
        return {
          title: film.title,
          release_date: format(parseISO(film.release_date), "dd-MM-yyyy"),
        };
      });
    });

    state.people = [...state.people, ...results];
    state.pessoasFiltradas = [...state.pessoasFiltradas, ...results];

    if (globalConfig.value.ordenar) {
      state.pessoasFiltradas = state.pessoasFiltradas.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (state.searchAtual !== "") {
      buscarPersonagens(state.searchAtual);
    }

    if (next) {
      await fetchData(next);
    } else {
      localStorage.setItem("starWarsRawData", JSON.stringify(state.people));
      state.isFetching = false;
    }
  } catch (error) {
    state.isFetching = false;
  }
}

function loadStoredData() {
  const storedData = localStorage.getItem("starWarsRawData");
  if (storedData) {
    let data = JSON.parse(storedData);
    state.people = data;
    if (globalConfig.value.ordenar) {
      data = data.sort((a, b) => a.name.localeCompare(b.name));
    }
    state.pessoasFiltradas = data;
  } else {
    getFilms();
  }
}

loadStoredData();

function buscarPersonagens(values) {
  state.searchAtual = values;
  if (values === "") {
    if (!state.isFetching)
      if (globalConfig.value.ordenar) {
        state.pessoasFiltradas = state.people.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        state.pessoasFiltradas = state.people;
      }
    return;
  }
  let nomes = values.split(",").filter((nome) => nome.trim() !== "");
  if (globalConfig.value.ordenar) {
    state.pessoasFiltradas = state.people
      .filter((ppl) =>
        nomes.some((nome) =>
          ppl.name.toLowerCase().includes(nome.trim().toLowerCase())
        )
      ).sort((a, b) => a.name.localeCompare(b.name));
  } else {
    state.pessoasFiltradas = state.people.filter((ppl) =>
      nomes.some((nome) =>
        ppl.name.toLowerCase().includes(nome.trim().toLowerCase())
      )
    );
  }
}

const toggleModal = () => {
  state.isModalVisible = !state.isModalVisible;
};

const showMore = (personagem) => {
  state.personagemSelecionado = personagem;
  toggleModal();
};

const updateList = async () => {
  if (state.isFetching) return;
  state.people = [];
  state.films = [];
  state.pessoasFiltradas = [];
  getFilms();
};
</script>

<template>
  <main>
    <h1 class="titulo">Personagens Star Wars</h1>
    <StarWarsPersonagemBuscar
      @update-list="updateList"
      @buscar-personagem="buscarPersonagens"
      :fetchingData="state.isFetching"
    />
    <ul>
      <div
        v-show="state.isFetching && globalConfig.carregando"
        class="fetching"
      >
        <Icon
          icon="la:jedi-order"
          class="loading"
          width="32"
          height="32"
          color="#ffe81f"
        />

        <p>Carregando...</p>
      </div>

      <PersonagemItem
        transition
        name="fade"
        v-for="personagem in state.pessoasFiltradas"
        :personagem="personagem"
        @show-more="showMore"
      />

      <Modal
        v-show="state.isModalVisible"
        @close="toggleModal"
        :personagem="state.personagemSelecionado"
      />
    </ul>
  </main>
</template>

<style scoped lang="scss">
$main-color: #ffe81f;
$scnd-color: #908207;

main {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 42px 18px;

  .titulo,
  .fetching p {
    text-align: center;
    color: $main-color;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    font-family: "Starjedi", sans-serif;
    letter-spacing: 0.2em;
  }

  .titulo {
    margin-bottom: 10px;
  }

  .fetching {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      animation: blink 2s linear infinite;
    }
  }

  .loading {
    animation: flip 2s linear infinite;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    display: block;
    margin-top: 1rem;
  }

  @keyframes flip {
    0%,
    100% {
      transform: rotateY(0deg);
      color: $main-color;
    }

    50% {
      color: $scnd-color;
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0.5;
      color: $main-color;
    }

    50% {
      opacity: 1;
      color: $scnd-color;
    }
  }
}
</style>
