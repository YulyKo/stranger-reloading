<template>
  <form class="form" id="form" @submit="addTag">
      <SVG_Component></SVG_Component>
    <div class="form__container">
      <p>{{ this.error }}</p>
      <label class="text text-m form__container_label" for="type-tag">Type of tag</label>
      <select class="text text-s form__container_select form__container_select--type-tag" id="type-tag" v-model="tag.id_type">
        <option v-for="tagType of tagsTypes" :value="tagType.id" :key="tagType.id" :max="15">{{ tagType.name }}</option>
      </select>
      <label class="text text-m form__container_label" for="name">Name tag</label>
      <input class="text text-s form__container_input" v-model="tag.name" id="name" type="text">
      <section class="flex picker" v-if="tag.id_type !== 3">
        <div class="picker picker_container w-13vw">
          <label class="text text-m form__container_label" for="bgColor">Background color tag</label>
          <input class="text text-s form__container_input" v-model="tag.bg_color" id="bgColor" type="color" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$">
        </div>
        <div class="picker picker_container w-13vw">
          <label class="text text-m form__container_label" for="textColor">Text color tag</label>
          <input class="text text-s form__container_input" v-model="tag.text_color" id="textColor" type="color" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$">
        </div>
      </section>
      <span class="text text-s tag-preview" v-bind:style="{backgroundColor: this.tag.bg_color, color: this.tag.text_color}">{{ tag.name }}</span>
      <button class="text text-m form__container_button-add" @click="cleanForm">Add tag</button>
    </div>
  </form>
</template>

<script>
    import {mapGetters} from "vuex";
    import mainStyles from "../../../../main.sass";
    import SVG_Component from './../svg';
    export default {
      components: {
        SVG_Component: SVG_Component
      },
      computed: {
        ...mapGetters({
          user: 'user/USER',
        }),
      },
      data() {
        return {
          tag: {
            id_type: 1,
            author: '',
            name: 'name',
            bg_color: '#CCCCCC',
            text_color: '#333333',
          },
          type_relation: {
            name: 'name',
          },
          tagsTypes: [
            {
              id: 1,
              name: "plot",
            },
            {
              id: 2,
              name: "art",
            },
            {
              id: 3,
              name: "relationship",
            },
          ],
          error: '',
        }
      },
      methods: {
        addTag() {
          this.tag.author = this.user.login;
          if (this.tag.name.length >= 3 && this.tag.name.length <= 15) {
            if (this.tag.id_type === 3) {
              this.type_relation.name = this.tag.name;
              this.$store.dispatch(`relationship/POST_NEW_RELATIONSHIP_TYPE_TO_API`, this.type_relation);
            } else this.$store.dispatch(`tag/SET_TAG_TO_API`, this.tag);
          } else if(this.tag.name.length < 3) this.error = 'name is so shot';
          else if (this.tag.name.length > 15) this.error = 'name is so long';
        },
        cleanForm() {
          document.getElementById('form').reset();
        }
      },
      css: [
        mainStyles,
      ],
    };
</script>
<style lang="sass" scoped>
  .form__container_label
    display: block
    width: 100px

  .picker
    display: flex
    justify-content: space-evenly
    text-align: -webkit-center
    &_container
      flex-direction: column
      align-items: center

  .tag-preview
    display: inline-block
    margin: 59px 42px
    padding: .5em 1rem
    border-radius: 50px
</style>
