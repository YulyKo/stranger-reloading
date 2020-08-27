import {URL_COMMON} from "../../index";
import axios from "axios";

const module = {
  namespaced: true,
  state: {
    relationship: null,
    types: null,
  },
  getters: {
    RELATIONSHIP: state => state.relationship,
    TYPES: state => state.types,
  },
  mutations: {
    SET_RELATIONSHIP_TO_STORE: (store, relationship) => { store.relationship = relationship},
    SET_RELATIONSHIP_TYPES_TO_STORE: (store, types) => { store.types = types},
    SET_NEW_RELATIONSHIP_TYPE_TO_STORE: (store, newType) => { store.types.push(newType) },
    DEL_RELATIONSHIP_TYPE_FROM_STORE: (store, type) => {
      for (let index = 0; index < store.types.length; index++) {
        if (store.types[index].data.id === type)
          store.types.splice(index, type)
      }
      store.types.re(type) },
  },
  actions: {
    async GET_RELATIONSHIP_FROM_API_BY_ID(context, id) {
      const { data } = await axios.get(`${URL_COMMON}/relationships/${id}`);
      context.commit('SET_RELATIONSHIP_TO_STORE', data);
    },
    async POST_RELATIONSHIP_TO_API(context, payload) {
      await axios.post(`${URL_COMMON}/relationships`, payload);
    },
    async GET_RELATIONSHIP_TYPES_FROM_API(context) {
      const { data } = await axios.get(`${URL_COMMON}/type_relationships`);
      context.commit('SET_RELATIONSHIP_TYPES_TO_STORE', data);
    },
    async POST_NEW_RELATIONSHIP_TYPE_TO_API(context, payload) {
      await axios.post(`${URL_COMMON}/type_relationships`, payload);
      context.commit('SET_NEW_RELATIONSHIP_TYPE_TO_STORE', payload)
    },
    async DELETE_RELATIONSHIP_TYPE_FROM_API_BY_ID(context, id) {
      await axios.delete(`${URL_COMMON}/type_relationships/${id}`);
      context.commit('DEL_RELATIONSHIP_TYPE_FROM_STORE'. id)
    },

  },
};

export default module;
