import axios from 'axios';
import {URL_COMMON} from "../../index";

const http_plot_module = {
  namespaced: true,
  state: {
    plot: null,
  },
  getters: {
    PLOT: state => state.plot,
  },
  mutations: {
    SET_PLOT_TO_STATE: (state, plot) => state.plot = plot,
  },
  actions: {
    async GET_PLOT_FROM_API_BY_ID(context, id) {
      const { data } = await axios.get(`${URL_COMMON}/plots_with_tags_persons_locations/${id}`);
      context.commit('SET_PLOT_TO_STATE', data.plot);
    },
    async POST_PLOT_TO_API(context, plot) {
      await axios.post(`${URL_COMMON}/plots`, plot);
    },
  },
};

export default http_plot_module;
