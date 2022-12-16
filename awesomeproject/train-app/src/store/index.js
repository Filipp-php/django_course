import { createStore, createLogger } from 'vuex'
import editor from './modules/editor'
import login from './modules/login'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    currentStyle: {
      left: 0, 
      right: 0,
      bottom: 0, 
      zIndex: 10,
      position: 'relative'
    }
  },
  getters: {
  },
  mutations: {
    savePosition (state, newPos) {
      state.currentStyle.position = newPos
    }
  },
  actions: {
    changePosition ({ state, commit }, value) {
      commit('savePosition', value)
    }
  },
  modules: {
    editor,
    login
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
