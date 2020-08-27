<template>
  <div class="nav">
    <nav class="admin-menu">
      <router-link class="text text-m link" tag="a" to="/admin/add-plot">Add plot</router-link>
      <router-link class="text text-m link" tag="a" to="/admin/add-art">Add art</router-link>
      <router-link class="text text-m link" tag="a" to="/admin/add-hero">Add hero</router-link>
      <router-link class="text text-m link" tag="a" to="/admin/add-location">Add location</router-link>
      <router-link class="text text-m link" tag="a" to="/admin/add-relationship">Add relationship</router-link>
      <div class="text text-m link"><router-link class="text text-m link" tag="a" to="/admin/add-tag">Add tag</router-link></div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
  }
</script>

<style lang="sass" scoped>
  .admin-menu
    display: flex
    justify-content: space-evenly
    align-items: center
    height: 10vh
    background-color: #444444
</style>
