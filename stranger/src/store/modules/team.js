import axios from 'axios';
import { URL_COMMON } from "../index";

const team = {
  namespaced: true,
  state: {
    team: null,
  },
  getters: {
    TEAM: (state) => state.team,
  },
  mutations: {
    SET_TEAM_INFO_TO_STATE: (state, team) => { state.team = team; }
  },
  actions: {
    async GET_TEAM_INFO_FROM_API(context) {
      const { data } = await axios.get(`${URL_COMMON}/team`);
      context.commit('SET_TEAM_INFO_TO_STATE', data)
    },
  },
};

export default team;
