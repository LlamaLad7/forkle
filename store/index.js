/* import VuexPersistence from 'vuex-persist'
let vuexLocalStorage = null

// if (process.browser) {
vuexLocalStorage = new VuexPersistence({
})
// } */
export const state = () => ({
  settings: {
    autocomplete: false
  }
})

export const mutations = {
  set (state, payload) {
    state.settings[payload[0]] = payload[1]
  }
}
// export const plugins = [vuexLocalStorage.plugin]
