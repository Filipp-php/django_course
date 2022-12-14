const state = {
	isLoggedIn: ''
}

const actions = {
	changeName1 ({ state, commit }, value) {
		commit('saveValue', value)
	}
}

const mutations = {
	saveValue (state, newValue) {
		state.isLoggedIn = newValue
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}