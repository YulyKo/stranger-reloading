<template>
  <div class="page">
    <h1 class="text text-xl">Heroes</h1>
    <div class="flex flex__page">
      <article class="page__card" v-for="hero in heroes" :id="hero.id" :key="hero.id">
        <h2 class="hero-name text-l">{{ hero.name }}</h2>
        <div class="flex flex__page">
          <div>
            <p class="text-l">Age</p>
            <p class="text text-m">{{ hero.age }}</p>
          </div>
          <div>
            <p class="text-l">Sex</p>
            <p class="text text-m">{{ hero.sex }}</p>
          </div>
        </div>
        <p>{{ hero.shot_description }}</p>
        <div class="flex flex__page">
          <router-link class="text-m link" t ag="a" :to="{name: 'Hero', params: {id: hero.id}}">Read more</router-link>
          <div v-if="isAdmin">
            <button class="text-m button--del" @click="deletePlot(hero.id)">Delete</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {},
  computed: {
    ...mapGetters({
        heroes: 'heroes/HEROES',
      isAdmin: 'user/IS_ADMIN',
    }),
  },
  beforeCreate() {
    this.$store.dispatch('heroes/GET_HEROES_FROM_API');
  },
  methods: {
    deletePlot(id) {
      document.getElementById(id).style.backgroundColor = '#e12a1e';
      this.$store.dispatch('heroes/DELETE_HERO_FROM_API_BY_ID', id)
    },
  },
}
</script>

<style lang="sass" scoped>
  @import '../../../main'
  .page
    color: $page-red

  .hero-name
    margin-top: 0
    text-align: center
    font-weight: 300
    @media (max-width: 551.98px)
      font-size: 50px
    @media (min-width: 728px)
      font-size: 70px
</style>