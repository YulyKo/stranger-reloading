<template>
    <form id="form" class="form" @submit="addRelationship">
      <SVG_Component></SVG_Component>
      <div class="form__container">
        <div class="flex flex--form-hero w-50vw">
          <div class="w-50p">
            <label class="text text-m form__container_label" for="firstHero">Person 1</label>
            <br>
            <select class="text text-m form__container_select form__container_select--person" v-model="relationship.id_person" name="" id="firstHero" >
              <option class="text text-m" v-for="(hero, id) in heroes" :key="id" :value="hero.id">{{hero.name}}</option>
            </select>
          </div>
          <div class="w-50p">
            <label class="text text-m form__container_label" for="secondHero">Person 2</label>
            <br>
            <select class="text text-m form__container_select form__container_select--person" v-model="relationship.id_person2" name="" id="secondHero">
              <option class="text text-m" v-for="(hero, id) in heroes" :key="id" :value="hero.id">{{hero.name}}</option>
            </select>
          </div>
        </div>
        <div class="mt-2rem ta-center">
          <label class="text text-m form__container_label" for="type-relationship">Type relationship</label>
          <br>
          <select class="text text-m form__container_select form__container_select--type" v-model="relationship.id_type_relationship" id="type-relationship">
              <option class="text text-m" v-for="(type, id) in types" :key="id"  type="radio" :value="type.id">
              {{type.name}}
            </option>
          </select>
          <button v-if="isAdmin" class="text text-m button button--del" @click="del">Delete</button>
        </div>
        <label class="text text-m form__container_label" for="">Reasons</label>
        <textarea class="text text-m form__container_textarea form__container_textarea--description" v-model="relationship.reasons" name="reason" id="" cols="30" rows="10"></textarea>
        <button class="text text-m form__container_button-add" type="submit">Add relationship</button>
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
    data() {
      return {
        relationship: {
          id_person: 0,
          id_person2: 0,
          id_type_relationship: null,
          reasons: '',
        },
      }
    },
    computed: {
      ...mapGetters({
        types: `relationship/TYPES`,
        heroes: `heroes/HEROES`,
        isAdmin: 'user/IS_ADMIN',
      }),
    },
    methods: {
      addRelationship() {
        console.log('add relationship');
        if (this.relationship.id_person && this.relationship.id_person2)
          this.$store.dispatch('relationship/POST_RELATIONSHIP_TO_API', this.relationship)

        document.getElementById('form').reset();
      },
      del() {
        let id = this.relationship.id_type_relationship
        this.$store.dispatch('relationship/DELETE_RELATIONSHIP_TYPE_FROM_API_BY_ID', +id)
      },
    },
    beforeCreate() {
      this.$store.dispatch(`relationship/GET_RELATIONSHIP_TYPES_FROM_API`, 'relationship_tags');
      this.$store.dispatch(`heroes/GET_HEROES_FROM_API`);
    },
    css: [ mainStyles ],
  };
</script>
<style lang="css" scoped>
  label {
    position: relative;
  }
</style>
