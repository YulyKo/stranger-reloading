import axios from 'axios';
import { URL_COMMON } from "../../index";

const tag = {
  namespaced: true,
  state: {
    tag: null,
  },
  getters: {
    TAG: (state) => state.tag,
  },
  mutations: {
    SET_TAG_TO_STATE: (state, tag) => { state.tag = tag; },
    ADD_TAG: (state, tag) => state.tag = tag,
  },
  actions: {
    async SET_TAG_TO_API(context, payload) {
      await axios.post(`${URL_COMMON}/tags`, payload);
    },
  },
};

export default tag;
