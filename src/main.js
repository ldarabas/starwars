import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";

const globalConfig = ref({
  carregando: true,
  ordenar: true,
});

const savedConfig = localStorage.getItem("globalConfig");
if (savedConfig) {
  globalConfig.value = JSON.parse(savedConfig);
} else {
  localStorage.setItem("globalConfig", JSON.stringify(globalConfig.value));
}

const app = createApp(App);

app.provide("globalConfig", globalConfig);

app.use(router);

app.mount("#app");
