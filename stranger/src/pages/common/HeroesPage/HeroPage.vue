<template>
  <div class="hero">
    <h1 class="text text-l hero__name">{{ hero.name }}</h1>
    <h2 class="text text-l">Shot description</h2>
    <p class="text text-m">{{ hero.shot_description }}</p>
    <div class="flex w-50vw">
      <div>
        <p class="text text-l">Age</p>
        <p class="text text-m">{{ hero.age }}</p>
      </div>
      <div>
        <p class="text text-l">Sex</p>
        <p class="text text-m">{{ hero.sex }}</p>
      </div>
    </div>
    <h2 class="text text-l">Story of life</h2>
    <p class="text text-s">{{ hero.story_of_life }}</p>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    props: {},
    computed: {
      ...mapGetters({
        hero: 'heroes/HERO'
      }),
    },
    beforeCreate() {
      this.$store.dispatch('heroes/GET_HERO_FROM_API_BY_ID', this.$route.params.id);
    },
  };
</script>

<style lang="sass" scoped>
  @import '../../../main'

  .hero
    background-color: $page-turquoise
    display: flex
    flex-direction: column
    align-content: center
    color: $page-red
    @media (max-width: 551.98px)
      padding: 0 48px
    @media (min-width: 728px)
      padding: 0 64px
    .text
      width: 70%
      margin: 1rem auto
      line-height: 2
    &__name
      margin-top: 0
      text-align: center
      font-weight: 300
      @media (max-width: 551.98px)
        font-size: 50px
      @media (min-width: 728px)
        font-size: 70px

  .flex
    margin: 0 auto
    text-align: center
    justify-content: space-evenly

</style>