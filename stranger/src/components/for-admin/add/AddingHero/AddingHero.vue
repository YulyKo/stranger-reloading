<template>
    <form class="form" id="form" @submit="addHero">
      <SVG_Component></SVG_Component>
      <div class="form__container">
        <label class="text text-m form__container_label" for="name">Name</label>
        <input class="text text-m form__container_input" id="name" type="text" v-model="hero.name">
        <div class="flex flex--form-hero w-50vw">
          <div class="w-50vw">
            <label class="text text-m form__container_label" for="age">Age</label>
            <input class="text text-m form__container_input" id="age" type="number" v-model="hero.age">
          </div>
          <div class="w-50vw">
            <label class="text text-m form__container_label" for="sex">Sex</label>
            <input class="text text-m form__container_input" id="sex" type="text" v-model="hero.sex">
          </div>
        </div>
        <label class="text text-m form__container_label" for="description">Shot description</label>
        <textarea class="text text-m form__container_textarea form__container_textarea--description" id="description" v-model="hero.shot_description" name="" cols="30" rows="10"></textarea>
        <label class="text text-m form__container_label" for="story">Story of life</label>
        <textarea class="text text-m form__container_textarea" id="story" v-model="hero.story_of_life" cols="50" rows="15"></textarea>
        <button class="text text-m form__container_button-add" @click="cleanForm">Add hero</button>
      </div>
    </form>
</template>

<script>
  import {mapGetters} from "vuex";
  import mainStyles from "../../../../main.sass";
  import SVG_Component from './../svg';

  export default {
    components: { SVG_Component: SVG_Component },
    data() {
      return {
        hero: {
          author: null,
          name: null,
          age: null,
          sex: 'none',
          shot_description: null,
          story_of_life: null,
        },
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/USER'
      }),
    },
    methods: {
      addHero() {
        this.hero.author = this.user.login;
        if (this.hero.name && this.hero.age && this.hero.story_of_life && this.hero.shot_description)
          this.$store.dispatch('heroes/POST_HERO_TO_API', this.hero);
      },
      cleanForm() {
        document.getElementById('form').reset();
      }
    },
    css: {
      mainStyles
    }
  };
</script>
<style lang="sass" scoped>
  .w-50vw 
    .form__container_input
      padding: 4%
</style>