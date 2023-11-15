<template>
  <div class="about">
    <img class="git-image" src="../assets/github.png" alt="Github" />
    <a class="href" href="https://github.com/ldarabas/starwars" target="_blank"
      >Repositório</a
    >
    <a class="href" href="https://ldarabas.github.io/starwars" target="_blank"
      >Github Pages</a
    >
  </div>
</template>

<style>
.git-image {
  width: 128px;
  height: 128px;
  margin-bottom: 40px;
}

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
}

.href {
  font-size: 30px;
  text-decoration: none;
  color: #ffe81f;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
  font-family: "Starjedi", sans-serif;
  letter-spacing: 0.2em;

  margin-top: 20px;
}
</style>
