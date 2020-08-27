import axios from 'axios';
import {URL_COMMON} from "../../index";

const locations_module = {
  namespaced: true,
  state: {
    locations: null,
  },
  getters: {
    LOCATIONS: (state) => state.locations,
  },
  mutations: {
    SET_LOCATIONS_TO_STATE: (state, locations) => { state.locations = locations; },
  },
  actions: {
    async GET_LOCATIONS_FROM_API(context) {
      const { data } = await axios.get(`${URL_COMMON}/locations`);
      context.commit('SET_LOCATIONS_TO_STATE', data);
    },
  },
};

export default locations_module;
