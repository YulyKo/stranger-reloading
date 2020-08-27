<template>
  <div>
    <article>
      <h1>{{ location.name }}</h1>
      <img :src="this.location.photo_url" alt="no photo">
      <p>{{ location.author }}</p>
    </article>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "LocationPage",
    computed: {
      ...mapGetters({location: 'location/LOCATION'})
    },
    beforeCreate() {
      this.$store.dispatch('location/GET_LOCATION_FROM_API_BY_ID',  this.$route.params.id)
    }
  }
</script>
