import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
  },
  mutations: {
    setCards: (state, response) => {
      state.cards = response;
    },
  },
  actions: {
    getCardsFromApi({commit}) {
      return axios.get('https://pixabay.com/api/?key=22969416-bac85bd0e32c76bcdc4515e74&q=cats&image_type=all&per_page=100')
          .then((response) => {
            commit('setCards', response.data.hits);
          })
          .catch((error) => {
            console.log(error);
          })
    }
  },
  getters: {
    cardsState (state) {
      return state.cards;
    },
  }
})
