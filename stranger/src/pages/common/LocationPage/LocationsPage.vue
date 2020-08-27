<template>
  <div>
    <h1 class="text text-xl">Locations</h1>
    <div class="page">
      <figure class="page__card" :id="location.id"
      v-for="location in locations" :key="location.id">
        <router-link 
          class="page__card_img" tag="img"
          :src="location.photo_url" alt="no photo" 
          :to="{name: 'Location', params: {id: location.id}}"></router-link>
        <figcaption class="page__card_info">
          <p class="text text-m">{{location.name}}</p>
          <div v-if="isAdmin">
            <button class="text-m button--del" @click="deleteLocation(location.id)">Delete</button>
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import main from "../../../main.sass";
  export default {
    name: "LocationsPage",
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        locations: 'locations/LOCATIONS',
        isAdmin: 'user/IS_ADMIN'
      })
    },
    beforeCreate() {
      this.$store.dispatch('locations/GET_LOCATIONS_FROM_API')
    },
    methods: {
      deleteLocation(id) {
        document.getElementById(id).style.backgroundColor = '#e12a1e';
        this.$store.dispatch('location/DELETE_LOCATION_FROM_API_BY_ID', +id)
      },
    },
    sass: { main }
  }
</script>

<style lang="sass" scoped>
@import '../../../main'
.page__card
  display: inline-block
  margin: 0 2px 15px
  padding: 15px
  padding-bottom: 10px
  break-inside: avoid
  border: 2px solid $page-red
  box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4)
  transition: opacity .4s ease-in-out
  &::hover
    background-color: $page-purple
      
.page__card_img 
  width: 100%
  border-radius: 35px
  cursor: pointer

.page
  &.page__card
  &.page__card_info
    line-height: 1.5
 
.page__card
  margin-bottom: 20px
  @media (min-width: 0px) and (max-width: 755px) 
    padding: 3rem
  @media (min-width: 756px) and (max-width: 1511px)
    padding: 1rem
  @media (min-width: 1512px) and (max-width: 2519px)
    padding: .5rem
  @media (min-width: 2868px) and (max-width: 2271px)
    padding: 23px
  @media (min-width: 2772px)
    padding: 20px

.page .page__card
  @media (min-width: 0px) and (max-width: 755px) 
    width: 90%
  @media (min-width: 756px) and (max-width: 1007px)  
    width: 87%
  @media (min-width: 1008px) and (max-width: 1259px) 
    width: 82%
  @media (min-width: 1260px) and (max-width: 1511px) 
    width: 83%
  @media (min-width: 1512px) and (max-width: 1763px)
    width: 88%
  @media (min-width: 1764px) and (max-width: 2015px)
    width: 90%
  @media (min-width: 2016px) and (max-width: 2267px)
    width: 73%
    margin: 0 12px 15px
  @media (min-width: 2268px)
    width: 516px

.page
  margin: 0 auto
  column-width: 320px
  column-gap: 15px
  background-color: $page-turquoise
  @media (min-width: 0px) and (max-width: 755px) 
    width: 504px
    column-gap: 0px
  @media (min-width: 756px) and (max-width: 1007px)  
    width: 756px
  @media (min-width: 1008px) and (max-width: 1259px) 
    width: 1008px
  @media (min-width: 1260px) and (max-width: 1511px) 
    width: 1260px
  @media (min-width: 1512px) and (max-width: 1763px)
    width: 1512px
    -webkit-column-gap: 25px
    -moz-column-gap: 25px
    column-gap: 25px
  @media (min-width: 1764px) and (max-width: 2267px)
    width: 1764px
    column-gap: 42px
    -webkit-column-gap: 42px
    -moz-column-gap: 42px
  @media (min-width: 2268px)
    width: 2268px
    -webkit-column-gap: 0
    -moz-column-gap: 0
    column-gap: 0
    -webkit-column-width: 500px
    -moz-column-width: 500px
    column-width: 500px
</style>
