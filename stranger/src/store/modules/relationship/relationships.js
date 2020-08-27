import {URL_COMMON} from "../../index";
import axios from "axios";

const module = {
  namespaced: true,
  state: {
    relationships: null,
  },
  getters: {
    RELATIONSHIPS: state => state.relationships,
  },
  mutations: {
    SET_RELATIONSHIPS_TO_STATE: (state, relationships) => { state.relationships = relationships},
  },
  actions: {
    async GET_RELATIONSHIPS_FROM_API(context) {
      const { data } = await axios.get(`${URL_COMMON}/relationships`);
      context.commit('SET_RELATIONSHIPS_TO_STATE', data);
    },
  },
};

export default module;
