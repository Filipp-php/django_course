import { createStore, createLogger } from 'vuex'
import editor from './modules/editor'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    editor
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
