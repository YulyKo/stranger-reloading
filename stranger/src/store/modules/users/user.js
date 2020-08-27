import axios from "axios";
import {URL_COMMON} from "../../index";

const module = {
  namespaced: true,
  state: {
    user: {
      login: 'hero9'
    },
    isAdmin: true
  },
  getters: {
    USER: state => state.user,
    IS_ADMIN: state => state.isAdmin
  },
  mutations: {
    SET_USER_TO_STATE: (state, userLogin, userName) => {
      state.user.login = userLogin;
      if (userName !== '') {
        state.isAdmin = true
      } else state.isAdmin = false
    },
    SET_DEFAULT_INFO_OF_USER: (state) => {
      state.isAdmin = false;
      state.user.login = '';
    }
  },
  actions: {
    async POST_USER_TO_API(context, user) {
      await axios.post(`${URL_COMMON}/users`, user);
      context.commit('SET_USER_TO_STATE', user);
    },
    async LOGIN_USER_TO_APP(context, userLogin, userName) {
      context.commit('SET_USER_TO_STATE', userLogin, userName)
    },
    async LOGOUT_USER(context) {
      context.commit('SET_DEFAULT_INFO_OF_USER')
    },
  },
};

export default module;