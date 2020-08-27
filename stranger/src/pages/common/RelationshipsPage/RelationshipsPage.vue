<template>
  <div class="page">
    <h1 class="text text-xl">Relationships</h1>
    <div class="flex flex__page">
      <article class="page__card" v-for="relationship in relationships" :key="relationship.id">
        <div class="flex">
          <section class="page__card_person">
            <h2 class="text-l ta-center">{{ relationship.person_name }}</h2>
            <div class="flex">
              <div class="">
                <p class="text-s ta-center">Age</p><br>
                <p class="text-m ta-center">{{ relationship.person_age }}</p>
              </div>
              <div >
                <p class="text-s ta-center">Sex</p><br>
                <p class="text-m ta-center">{{ relationship.person_sex }}</p>
              </div>
            </div>
            <div>
              <p class="text-l ta-center">Description</p>
              <p class="text text-s">{{ relationship.person_description }}</p>
            </div>
          </section>
          <section class="page__card_person">
            <h2 class="text-l ta-center">{{ relationship.person2_name }}</h2>
            <div class="flex">
              <div>
                <p class="text-s ta-center">Age</p><br>
                <p class="text-m ta-center">{{ relationship.person2_age }}</p>
              </div>
              <div>
                <p class="text-s ta-center">Sex</p><br>
                <p class="text-m ta-center">{{ relationship.person2_sex }}</p>
              </div>
            </div>
            <div>
              <p class="text-l ta-center">Description</p>
              <p class="text text-s">{{ relationship.person2_description }}</p>
            </div>
          </section>
        </div>
        <section>
          <span class="tag">{{ relationship.type_name }}</span>
          <p class="text text-s">{{ relationship.reasons }}</p>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "RelationshipsPage",
    computed: {
      ...mapGetters({ relationships: 'relationships/RELATIONSHIPS' })
    },
    beforeCreate() {
      this.$store.dispatch('relationships/GET_RELATIONSHIPS_FROM_API');
    }
  }
</script>

<style lang="sass" scoped>
@import '../../../main'

.flex
  justify-content: space-evenly 

.page__card
  color: $page-red
  @media (max-width: 1024px)
    width: 100vh
  @media (min-width: 1440px)
    width: 40vw
    padding: 1rem

.page__card_person
  width: 50%

.tag
  text-align: center
  display: block
</style>