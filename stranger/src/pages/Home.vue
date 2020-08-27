<template>
  <div>
    <article class="container container--left">
      <h2 class="title">Welcome to website</h2>
      <p class="text">Here you can to publish and see fun-arts, plots, persons of heroes future game</p>
    </article>
    <article class="container container--right">
      <h2 class="title">Welcome to website</h2>
      <p class="text">Here you can to publish and see fun-arts, plots, persons of heroes future game</p>
    </article>
    <article class="container container--warning">
      <h2 class="title">Welcome to website</h2>
      <p class="text">Here you can to publish and see fun-arts, plots, persons of heroes future game</p>
    </article>
  </div>
</template>

<script>
  export default {
    name: "Home"
  }
</script>

<style lang="sass" scoped>
  .container
    width: 30vw
    height: 60vh
    display: flex
    flex-direction: column
    justify-content: center
    border: 2px solid #334
    text-align: center
    &--right
      margin-left: auto
    &--left
      margin: 0
    &--warning
      background-color: #f9ff1e
  .text
    font-size: 32pt
    white-space: unset
  .title
    font-size: 51pt
</style>
