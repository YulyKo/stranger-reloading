<template>
    <div class="page">
        <h1 class="text text-xl">Plots</h1>
      <div class="flex flex__page">
          <section class="page__card" v-for="plot in plots" :id="plot.data.id" :key="plot.id">
            <h2 class="text text-l">{{ plot.data.title }}</h2>
            <h3 class="text text-m">{{ plot.data.description }}</h3>
            <ul class="tags">
              <li class="text-m tag tag--card" v-for="tag in plot.tags" :key="plot.id + tag.id"
                v-bind:style="{ backgroundColor: tag.bg_color, color: tag.text_color }">{{ tag.name }}</li>
            </ul>
            <ul class="tags">
              <li v-for="person in plot.persons" class="text-s tag tag--card" :key="plot.id + person.id">{{ person.name }}</li>
            </ul>
            <div class="flex">
              <div v-if="isAdmin">
                <button class="text-m button--del" @click="deletePlot(plot.data.id)">Delete</button>
              </div>
              <router-link class="text-m link" tag="a" :to="{name: 'Plot', params: {id: plot.data.id}}">Read more</router-link>
            </div>
          </section>
        </div>
    </div>
</template>

<script>
  import { mapGetters} from "vuex";
  import mainStyles from '../../../main.sass';

  export default {
    computed: {
      ...mapGetters({
        plots: 'plots/PLOTS',
        isAdmin: 'user/IS_ADMIN',
      }),
    },
    beforeCreate() {
      this.$store.dispatch('plots/GET_PLOTS_FROM_API');
    },
    methods: {
      deletePlot(id) {
        document.getElementById(id).style.backgroundColor = '#e12a1e';
        this.$store.dispatch('plots/DELETE_PLOT_FROM_API_BY_ID', +id)
      },
    },
    css: {
      mainStyles
    },
  };
</script>
<style lang="sass" scoped>
@import "../../../main"


.tags
  margin-bottom: .6rem
  margin-top: 0
  padding: 0 

.tag--card
  box-sizing: border-box
  list-style: none
  cursor: none

.text
  color: $page-red
</style>