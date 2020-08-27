<template>
    <div class="form">
      <SVG_Component></SVG_Component>
      <div class="form__container">
        <label for="title" class="text text-m form__container_label">Title</label>
        <input class="text text-s form__container_input" id="title" type="text" v-model.trim="plot.title">

        <label for="description" class="text text-m form__container_label">Description</label>
        <textarea class="text text-s form__container_textarea form__container_textarea--description"
                  id="description" v-model="plot.description" name="description" cols="30" rows="10"></textarea>

        <label class="text text-s form__container_label">List of persons</label>
        <section>
          <div class="flex form__container_tags">
            <div v-for="(hero, id) in heroes" :key="id">
              <input class="text text-s form__container_checkbox" type="checkbox"
                     :id="'hero' + hero.id" :value="hero.id" v-model="plot.id_persons">
              <label :for="'hero' + hero.id" class="text text-s tag">
                {{ hero.name }}
              </label>
            </div>
          </div>
        </section>

        <label class="text text-m form__container_label">List of locations</label>
        <section>
          <div class="flex form__container_tags">
            <div v-for="location in locations" :key="location.id">
              <input class="text text-s form__container_checkbox" type="checkbox"
                     :id="'location' + location.id" :value="+location.id" v-model="plot.id_locations">
              <label :for="'location' + location.id" class="text text-s tag" >
                {{ location.name }}
              </label>
            </div>
          </div>
        </section>

        <label class="text text-m form__container_label">Tags</label>
        <section class="text text-s flex form__container_tags">
          <div v-for="tag in tags" :key="tag.id">
            <div v-if="isAdmin">
              <span class="text text-s button button--del" @click="deleteTag('tag' + tag.id, tag.id)">del</span>
            </div>
            <input class="text text-s form__container_checkbox" :id="tag.id" :value="+tag.id"
                    type="checkbox" v-model="plot.id_tags">
            <label :id="'tag' + tag.id" :for="tag.id"  class="text text-s tag">
              {{ tag.name }}
            </label>
          </div>
        </section>
        <label for="text" class="text text-m form__container_label">Text</label>
        <textarea class="text text-s form__container_textarea" v-model="plot.text"
                  name="text" id="text" cols="30" rows="10"></textarea>
        <button class="text text-m form__container_button-add" @click="addPlot">
            Add plot
        </button>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from "vuex";
    import SVG_Component from './../svg';

  export default {
    components: { SVG_Component: SVG_Component },
    computed: {
      ...mapGetters({
        tags: `tags/TAGS`,
        heroes: `heroes/HEROES`,
        user: 'user/USER',
        locations: 'locations/LOCATIONS',
        isAdmin: 'user/IS_ADMIN',
      }),
    },
    data() {
      return {
        plot: {
          title: '',
          author: '',
          text: '',
          id_locations: [],
          id_persons: [],
          id_tags: [],
          description: '',
        },
      }
    },
    methods: {
      addPlot() {
        if (this.plot.description.length > 10 ) {
          if ( this.plot.text.length > 10 ) {
            if (this.plot.title.length > 5) {
              console.log('title length is ok : ' + this.plot.id_tags)
              this.plot.author = this.user.login;
              this.$store.dispatch(`plot/POST_PLOT_TO_API`, this.plot);
            }
          }
        }  
      },
      deleteTag(idItem, idTag) {
        document.getElementById(idItem).style.backgroundColor = '#cd4539';
        document.getElementById(idItem).style.color = '#72b896';
        this.$store.dispatch('tags/DELETE_TAG_FROM_API_BY_ID', {id: +idTag, id_type: 1})
      },
    },
    beforeCreate() {
      this.$store.dispatch(`tags/GET_TAGS_FROM_API`, 'plot');
      this.$store.dispatch(`plots/GET_PLOTS_FROM_API`);
      this.$store.dispatch(`heroes/GET_HEROES_FROM_API`);
      this.$store.dispatch('locations/GET_LOCATIONS_FROM_API')
    },
  };
</script>
<style lang="sass" scoped>
  .form__background
    height: 124vw
  .form__container
    margin-top: -124vw
</style>
