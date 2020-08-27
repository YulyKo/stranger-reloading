import {URL_COMMON} from "../../index";
import axios from "axios";
import firebase from "firebase";

const module = {
  namespaced: true,
  state: {
    arts: null,
  },
  getters: {
    ARTS: state => state.arts
  },
  mutations: {
    SET_ARTS_TO_STATE: (state, arts) => state.arts = arts,
  },
  actions: {
    async GET_ARTS_FROM_API(context) {
      const { data } = await axios.get(`${URL_COMMON}/arts`);
      context.commit('SET_ARTS_TO_STATE', data);
    },
    async DELETE_ART_FROM_API_BY_ID(context, id) {
      await axios.delete(`${URL_COMMON}/arts_with_tags/delete/${id}`)
        .then(() => console.log('ok'));
    },
    async DELETE_ART_IMAGE_FROM_FIREBASE(context, fileName) {
      const storageRef = firebase.storage().ref()
      let  desertRef = storageRef.child('arts/' + fileName);
      desertRef.delete().then(function () {
        console.log('deleted')
      }).catch(function (error) {
        throw error
      })
    }
  },
};

export default module;
