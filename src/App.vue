<template>
  <div id="app">
    <header>Header <font-awesome-icon far icon="heart" /></header>
    <main>
      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div> -->
      <router-view />
    </main>
    <footer>&copy; Copyright 2020 | All rights reserved</footer>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Castoro&family=Roboto:wght@300;400;500&display=swap");
</style>
