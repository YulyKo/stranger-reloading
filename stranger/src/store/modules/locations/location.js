import axios from 'axios';
import {URL_COMMON} from "../../index";

const module = {
  namespaced: true,
  state: {
    location: null,
  },
  getters: {
    LOCATION: (state) => state.location,
  },
  mutations: {
    SET_LOCATIONS_TO_STATE: (state, location) => { state.location = location; }
  },
  actions: {
    async GET_LOCATION_FROM_API_BY_ID(context, id) {
      const { data } = await axios.get(`${URL_COMMON}/locations/${id}`);
      context.commit('SET_LOCATIONS_TO_STATE', data[0]);
    },
    async POST_LOCATION_TO_API(context, payload) {
      await axios.post(`${URL_COMMON}/locations`, payload);
    },
    async DELETE_LOCATION_FROM_API_BY_ID(context, id) {
    await axios.delete(`${URL_COMMON}/locations/${id}`)
      .then(() => console.log('ok'));
    },
  },
};

export default module;
