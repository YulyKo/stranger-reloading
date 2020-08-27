<template>
  <div>
  <!-- __ = block
  _  = element
  -- = modifier -->
    <header class="header">
      <div class="flex header__heroes">
        <router-link v-if="user.login" tag="span" class="admin-page link" to="/admin">крест - лінка до адмінки</router-link>
        <nav class="flex header__heroes_menu">
          <div class="menu__hero menu__hero--gg">
            <router-link v-if="!user.login" tag="a" 
            class="text text-l link link--gg"
             to="/registration">Registration</router-link>

            <router-link v-if="!user.login" tag="a" 
            class="text text-l link link--gg" to="/login">Login</router-link>

            <span v-if="user.login" @click="logout" 
            class="text text-l link link--gg">Logout</span>

            <router-link tag="a" to="/" 
            class="text text-l link link--gg">Home</router-link>
            <router-link tag="a" to="/help-me" 
            class="text text-l link link--gg">Help me</router-link>
            <router-link tag="a" to="/team" 
            class="text text-l link link--gg">Team</router-link>
          </div>
          <div class="menu__hero">
            <div class="menu__hero_link-container">
              <img class="cloud"
                  src="https://firebasestorage.googleapis.com/v0/b/stranger-proba.appspot.com/o/res%2Fnool.png?alt=media&token=398bf52d-973f-483b-9e64-49b8ffb3cddc" alt="">
              <router-link tag="a" class="link-container__link link" to="/plots">Plots</router-link>
            </div>
            <img class="menu__hero_mam"
                src="https://firebasestorage.googleapis.com/v0/b/stranger-proba.appspot.com/o/res%2Fmam.png?alt=media&token=00227d42-09c9-4c4b-8ad3-a82524b83d62" alt="no">
          </div>
          <div class="menu__hero">
            <router-link tag="a" to="/heroes" class="link menu__hero_link-container">Heroes</router-link>
            <img class="menu__hero_dad"
                src="https://firebasestorage.googleapis.com/v0/b/stranger-proba.appspot.com/o/res%2Fpappy.png?alt=media&token=87655878-1b7f-45aa-bb55-dcccda789a28" alt="no">
          </div>
            <div class="menu__hero">
              <router-link tag="a" to="/locations" class="link menu__hero_link-container">Locations</router-link>
              <img class="menu__hero_uncle"
                  src="https://firebasestorage.googleapis.com/v0/b/stranger-proba.appspot.com/o/res%2Fhero.png?alt=media&token=7734ec62-5187-4ae2-a474-2623e742e5d9" alt="no">
            </div>
          <div class="menu__hero">
            <router-link tag="a" to="/relationships" class="link menu__hero_link-container">Relationships</router-link>
            <img class="menu__hero_sister"
                src="https://firebasestorage.googleapis.com/v0/b/stranger-proba.appspot.com/o/res%2Flolo.png?alt=media&token=1f0798b5-14b7-4bc0-a5c1-cbd034a6b4e5" alt="no">
          </div>
          <div class="menu__hero">
            <router-link tag="a" to="/arts" class="link menu__hero_link-container">Arts</router-link>
            <img class="menu__hero_molli"
                src="https://firebasestorage.googleapis.com/v0/b/stranger-proba.appspot.com/o/res%2Fcat.png?alt=media&token=301bd314-d5db-4aa0-9e85-0b21aace9ad5" alt="">
          </div>
        </nav>
      </div>
      <div class="header__name">Stranger {{ this.user.login }}</div>
    </header>
    <main class="content">
        <router-view></router-view>
    </main>
    <footer class="flex footer">
      <span>unicorn</span>
      <div class="form">
        <input class="input" type="email">
        <input class="input" type="text">
        <textarea class="textarea" name="message" id="" cols="30" rows="10"></textarea>
      </div>
    </footer>
  </div>
</template>

<script>
import main from './main.sass';
  import { mapGetters } from "vuex";

export default {
  name: 'App',
  components: {},
  methods: {
    logout() {
      this.$store.dispatch('user/LOGOUT_USER')
    },
  },
  computed: {
      ...mapGetters({
        user: 'user/USER',
      }),
    },
  css: [ main ],
}
</script>

<style lang="sass" scoped>
  @import './main'

  .header
    width: 100%
    height: 50vh

  .header__heroes
    width: 100%
    height: 76%

  .header__name
    width: 100%
    height: 24%
    background-color: #1F1D1C

  .header__heroes_menu
    width: 100%
    justify-content: space-around
    background-color: #253934

  .link--gg
    display: none
  //   :hover
  //     display: block

  .menu__hero
    width: 7em
    height: 100%
    display: flex
    align-items: flex-end
    transition: all 0.3s ease
    -webkit-transition: all 0.3s ease
    -moz-transition: all 0.3s ease
    -o-transition: all 0.3s ease
    &--gg
      display: flex
      flex-direction: column
      align-items: flex-start
      &:hover > .link--gg
        display: block
    &:hover > .menu__hero_link-container
      display: block
      // animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both


  .menu__hero_link-container
    display: none
    // -webkit-animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both
    animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both
    position: absolute
    &:hover
      animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both
      color: #42b983
      cursor: pointer

  .content
    width: 100%
    background-color: $page-turquoise

  .footer
    width: 100%
    height: 50vh
    background-color: #fa97d3
    justify-content: space-evenly
    align-items: center

  .form
    input, textarea
        height: 20px
        outline: none
        background-color: #9399e5

  .admin-page
    background-color: #888888
    &:hover
      background-color: #039be5
      cursor: pointer

  .menu__hero_mam
    height: 69%

  .menu__hero_dad
    height: 70%

  .menu__hero_uncle
    height: 60%

  .menu__hero_sister
    height: 37%

  .menu__hero_molli
    height: 23%

  .cloud
    height: 100px


</style>
