import {URL_COMMON} from "../../index";
import Axios from 'axios';

const module = {
  namespaced: true,
  state: {
    art: null,
  },
  getters: {
    ART: state => state.art
  },
  mutations: {
    SET_ART_TO_STATE: (state, art) => { state.art = art },
  },
  actions: {
    async GET_ART_FROM_API_BY_ID(context, id) {
      const { data } = await Axios.get(`${URL_COMMON}/arts/${id}`);
      context.commit('SET_ART_TO_STATE', data);
    },
    async POST_ART_TO_API(context, payload) {
      await Axios.post(`${URL_COMMON}/arts_with_tags`, payload);
    },
  },
};

export default module;
