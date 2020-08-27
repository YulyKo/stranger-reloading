<template>
  <div>
    <h1>Art</h1>
    <article>
      <p>{{ art.author }}</p>
      <img :src="art.url" alt="error">
      <h2>{{ art.title }}</h2>
      <p>{{ art.description }}</p>
      <div class="flex">Tags <br>
      <span class="text text-s tag" v-for="tag in art.tags" :key="tag.id"
      v-bind:style="{ backgroundColor: tag.bg_color, color: tag.text_color }">{{ tag.name }}</span>
    </div>
    </article>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "ArtPage",
    computed: {
      ...mapGetters({ art: 'art/ART' }),
    },
    beforeCreate() {
      this.$store.dispatch('art/GET_ART_FROM_API_BY_ID', this.$route.params.id);
    }
  }
</script>
