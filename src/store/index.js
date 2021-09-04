import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    submittedSurvey: null,
  },
  mutations: {
    SET_SUBMITTED_SURVEY(state, payload) {
      state.submittedSurvey = payload;
    },
  },
  actions: {},
  modules: {},
});
