const state = {
	isLoggedIn: false
}

const actions = {
	changeLoggedIn ({ state, commit }, value) {
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