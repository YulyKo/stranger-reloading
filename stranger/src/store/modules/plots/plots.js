import axios from 'axios';
import {URL_COMMON} from "../../index";

const http_post_module = {
    namespaced: true,
    state: {
        plots: null,
    },
    getters: {
        PLOTS: state => state.plots,
    },
    mutations: {
      SET_PLOTS_TO_STATE: (state, plots) => state.plots = plots,
      DELETE_PLOT_FROM_STATE: (state, plot) => {
        for (let index = 0; index < state.plots.length; index++) {
          if (state.plots[index].data.id === plot.id)
            state.plots.splice(index, plot)
        }
      }
    },
    actions: {
      async GET_PLOTS_FROM_API(context) {
        const { data } = await axios.get(`${URL_COMMON}/plots_with_tags_persons_locations`);
        context.commit('SET_PLOTS_TO_STATE', data);
      },
      async DELETE_PLOT_FROM_API_BY_ID(context, id) {
        await axios.delete(`${URL_COMMON}/plots_with_tags_persons_locations/delete/${id}`)
         .then(() => console.log('ok'));
        console.log( this.$store.plots)
      },
    },
};

export default http_post_module;
