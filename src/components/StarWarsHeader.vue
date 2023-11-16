<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav class="container">
      <div class="logo" v-on:click="$router.push('/')">
        <img src="../assets/star-wars-logo.png" alt="" />
        <h1>Star Wars List</h1>
      </div>
      <ul class="nav-routes">
        <RouterLink to="/">home</RouterLink>
        <RouterLink to="/options">opções</RouterLink>
        <RouterLink to="/about">sobre</RouterLink>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 4px solid #ffe81f;

  nav {
    display: flex;
    align-items: center;
    padding: 25px 18px;

    .logo {
      display: flex;
      align-items: center;
      gap: 20px;
      cursor: pointer;
      img {
        max-width: 64px;
      }

      h1 {
        font-size: 28px;
        font-family: "Starjedi", sans-serif;
        @media (max-width: 600px) {
          font-size: 20px;
        }
      }
    }

    .nav-routes {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      gap: 14px;
      list-style: none;

      a {
        text-decoration: none;
        font-family: "Starjedi", sans-serif;
        color: inherit;
        font-size: 16px;
        @media (max-width: 600px) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
