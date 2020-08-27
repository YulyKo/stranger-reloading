import axios from "axios";
import {URL_COMMON} from "../../index";

const module = {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    USERS: state => state.users,
  },
  mutations: {
    SET_USERS_TO_STATE: (state, users) => state.users = users,
  },
  actions: {
    async GET_USERS_FROM_API(context, url) {
      const { data } = await axios.get(`${URL_COMMON}/${url}`);
      context.commit('SET_USERS_TO_STATE', data);
    },
  },
};

export default module;