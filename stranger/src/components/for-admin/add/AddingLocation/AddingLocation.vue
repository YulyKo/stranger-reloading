<template>
    <form class="form" @submit="addLocation">
      <SVG_Component></SVG_Component>
      <div class="form__container">
        <button class="text text-m form__container_image form__container_image-btn">Add image</button>
        <input @change="setPicture" class="text text-m form__container_image form__container_image-input" id="file" type="file" accept="image/*">

        <label class="text text-m form__container_label" for="name">Name</label>
        <input class="text text-m form__container_input" v-model="location.name" id="name" type="text">

        <span class="text text-m form__container_label">Progress: {{previewImage.uploadValue.toFixed()+"%"}}
          <progress id="progress" :value="previewImage.uploadValue" max="100" ></progress>
        </span>

        <div class="center" v-if="previewImage.imageData">
          <img class="preview" :src="previewImage.picture" alt="no file">
          <br>
          <button class="text text-m form__container_button-add">Add location</button>
        </div>
      </div>
    </form>
</template>

<script>
    import { mapGetters } from "vuex";
    import firebase from "firebase";
    import SVG_Component from './../svg';

    export default {
      components: { SVG_Component: SVG_Component },
      computed: {
        ...mapGetters({
          user: 'user/USER',
        }),
      },
      data() {
        return {
          location: {
            author: '',
            name: '',
            photo_url: '',
          },
          previewImage: {
            uploadValue: 0,
            picture: null,
            imageData: null,
          },
        }
      },
      methods: {
        addLocation() {
          this.addLocationPictureToStore();
        },
        addLocationPictureToStore() {
          this.previewImage.picture = this.previewImage.imageData.name + this.location.name
          const storageRef = firebase.storage()
            .ref(`locations/${this.previewImage.picture}`)
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
            this.location.photo_url = url;
            this.addLocationToDb();
          });
        },
        addLocationToDb() {
          this.location.author = this.user.login;
          if (this.location.photo_url && this.location.author && this.location.name) {
            this.$store.dispatch('location/POST_LOCATION_TO_API', this.location);
          }
        },
        setPicture(event) {
          this.previewImage.picture = URL.createObjectURL(event.target.files[0]);
          this.previewImage.imageData = event.target.files[0];
        },
      },
      css: []
    };
</script>
