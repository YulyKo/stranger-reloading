<template>
  <form class="form" @submit="addArt">
    <SVG_Component></SVG_Component>
    <div class="form__container">
      <button class="text text-m form__container_image form__container_image-btn">Add image</button>
      <input @change="setPicture" class="text text-s form__container_image form__container_image-input" id="file" type="file" accept="image/*">
      <label class="text text-m form__container_label"  for="title">Title</label>
      <input class="text text-s form__container_input" id="title" type="text" v-model="art.title">
      <label class="text text-m form__container_label" for="description">Description</label>
      <textarea class="text text-m form__container_textarea form__container_textarea--description" id="description" type="text" v-model="art.description"></textarea>
      <label class="text text-m form__container_label" >Tags</label>
      <section class="flex form__container_tags">
        <div v-for="tag in tags" :key="tag.id">
          <div v-if="isAdmin">
            <span class="text text-s button--del" @click="deleteTag('tag' + tag.id, tag.id)">del</span>
          </div>
          <input class="text text-m form__container_checkbox" type="checkbox" v-model="art.tags" :id="tag.id" :value="tag.id">
          <label class="text text-s tag" :id="'tag' + tag.id" :for="tag.id">{{ tag.name }}</label>
        </div>
      </section>
      <span class="text text-m">Progress: {{previewImage.uploadValue.toFixed()+"%"}}
        <progress id="progress" :value="previewImage.uploadValue" max="100"></progress>
      </span>
      <div class="center" v-if="previewImage.imageData != null">
        <img class="preview" :src="previewImage.picture" alt="no file">
        <br>
        <button class="text text-m form__container_button-add" type="submit">Add art</button>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from "vuex";
  import firebase from 'firebase/app';
  import mainStyles from "../../../../main.sass";
  import SVG_Component from './../svg';

  export default {
    components: { SVG_Component: SVG_Component},
    data() {
      return {
        art: {
          author: null,
          title: null,
          description: null,
          url: null,
          tags: [],
        },
        previewImage: {
          uploadValue: 0,
          picture: null,
          imageData: null,
        },
      }
    },
    computed: {
      ...mapGetters({
        tags: 'tags/TAGS',
        user: 'user/USER',
        isAdmin: 'user/IS_ADMIN',
      })
    },
    methods: {
      addArt() {
        this.addArtPictureToStore();
      },
      addArtPictureToStore() {
        this.previewImage.picture = this.previewImage.imageData.name + this.art.title
        const storageRef = firebase.storage().ref(`arts/${this.previewImage.picture}`)
          .put(this.previewImage.imageData);
        storageRef.on('state_changed', snapshot => {
            this.previewImage.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => { console.log(error.message) },
          () => { this.complete(storageRef); }
        );
      },
      complete(storageRef) {
        this.previewImage.uploadValue = 100;
        storageRef.snapshot.ref.getDownloadURL().then( url => {
          this.previewImage.picture = url;
          this.art.url = url;
          this.addArtToDb();
        });
      },
      addArtToDb() {
        this.art.author = this.user.login;
        if (this.art.url && this.art.author && this.art.title) {
          this.$store.dispatch('art/POST_ART_TO_API', this.art);
        }
      },
      setPicture(event) {
        this.previewImage.picture = URL.createObjectURL(event.target.files[0]);
        this.previewImage.imageData = event.target.files[0];
      },
      deleteTag(idItem, idTag) {
        document.getElementById(idItem).style.backgroundColor = '#cd4539';
        document.getElementById(idItem).style.color = '#72b896';
        const id_type = 2
        this.$store.dispatch('tags/DELETE_TAG_FROM_API_BY_ID', {id: +idTag, id_type: id_type})
      },
    },
    beforeCreate() {
      this.$store.dispatch('tags/GET_TAGS_FROM_API', 'art');
    },
    css: [ mainStyles ],
  };
</script>

<style lang="sass" scoped>




</style>
