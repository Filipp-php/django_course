
const state = {
	name1: '',
	name2: '',
	currentTab: 'workout-view'

}

const actions = {
	changeName1 ({ state, commit }, value) {
		commit('saveName1', value)
	},
	changeName2 ({ state, commit }, value) {
		commit('saveName2', value)
	},
	changeCurrentTab ({ state, commit }, value) {
		commit('saveCurrentTab', value)
	}
}

const mutations = {
	saveName1 (state, {newName1}) {
		state.name1 = newName1
	},
	saveName2 (state, {newName2}) {
		state.name2 = newName2
	},
	saveCurrentTab (state, {newTab}) {
		state.currentTab = newTab
	}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}