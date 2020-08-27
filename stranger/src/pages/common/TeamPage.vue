<template>
  <div class="page">
    <article class="container container--left" v-for="human in team" :key="human.id">
      <img class="container__image" :src="setUrl(human.id)" alt="probem">
      <h2 class="text text-xl ta-center">{{ human.name }}</h2>
      <span class="text text-l">Date of bitdth: {{ human.data_of_birdth }}</span>
      <p class="text text-l">{{ human.description_of_work }}</p>
    </article>
  </div>
</template>

<script>
  import { mapGetters} from "vuex";
  
  export default {
    name: "TeamPage",computed: {
      ...mapGetters({
        team: 'team/TEAM',
      }),
    },
    methods: {
      setUrl(id) {
        return "https://firebasestorage.googleapis.com/v0/b/stranger-proba.appspot.com/o/team%2F"
                + id
                + ".png?alt=media&token=9337dddd-649a-4767-ab39-e5ee0697d5cf"
      },
    },
    beforeCreate() {
      this.$store.dispatch('team/GET_TEAM_INFO_FROM_API');
    },
  }
</script>

<style lang="sass" scoped>
  @import '../../main'

  .container
    margin-bottom: 12vh
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    text-align: center
    &__image
      width: 12vw
      margin: 0 auto
  
  .text-l
    color: $page-yellow
</style>
