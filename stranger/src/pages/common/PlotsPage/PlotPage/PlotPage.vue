<template>
  <div class="plot">
    <h2 class="text text-xl plot__title">{{ plot.data.title }}</h2>
    <p class="text text-s plot__author">by {{ plot.data.author }}</p>
    <h2 class="text text-m plot__text plot__text--description">{{ plot.data.description }}</h2>
    <div class="flex">
      <span class="text text-s tag" v-for="tag in plot.tags" :key="tag.id"
      v-bind:style="{ backgroundColor: tag.bg_color, color: tag.text_color }">{{ tag.name }}</span>
    </div>
     <div class="flex">
       <span class="text text-s tag" v-for="hero in plot.heroes" :key="hero.id" >{{ hero.name }}</span>
     </div>
     <div >
       <span class="text text-s tag" v-for="location in plot.locations" :key="location.id">{{ location.name }}</span>
     </div>
    <p class="text text-m plot__text">{{ plot.data.text }}</p>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import mainSass from '../../../../main.sass';

  export default {
    props: {},
    computed: {
      ...mapGetters({
        plot: 'plot/PLOT'
      }),
    },
    beforeCreate() {
      this.$store.dispatch('plot/GET_PLOT_FROM_API_BY_ID', this.$route.params.id);
    },
    css: [ mainSass ]
  };
</script>
<style lang="sass" scoped>

  @import '../../../../main'
  .plot
    background-color: $page-turquoise
    display: flex
    flex-direction: column
    align-content: center
    color: $form-dark-grey
    @media (max-width: 551.98px)
      padding: 0 48px
    @media (min-width: 728px)
      padding: 0 64px

  .flex
    flex-wrap: wrap

  .plot__title
    margin-bottom: 1rem

  .plot__text
    width: 70%
    margin: 1rem auto
    line-height: 2
    &--description
      line-height: 1.8

  .plot__author
    margin: 0
    font-style: italic
</style>
