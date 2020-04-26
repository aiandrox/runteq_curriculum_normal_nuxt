export const state = () => ({
  currentUser: null
})

export const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  }
}

export const getters = {
  currentUser: state => state.currentUser,
};

export const actions = {
  async signup({ commit }, userInfo) {
    try {
      const response = await this.$axios.post('/api/v1/users', { user: userInfo })
      commit('setCurrentUser', response.data.user)
      return response.data.user
    } catch (err) {
      commit('setCurrentUser', null)
      return Promise.reject(err)
    }
  },

  async login({ commit }, userInfo) {
    try {
      const response = await this.$axios.post('/api/v1/user_session', userInfo)
      commit('setCurrentUser', response.data.user)
    } catch (err) {
      commit('setCurrentUser', null)
      return Promise.reject(err)
    }
  },

  async getCurrentUser({ commit, state }) {
    const currentUser = state.currentUser
    if (currentUser) {
      return currentUser
    }

    try {
      const response = await this.$axios.get('/api/v1/users/me')
      commit('setCurrentUser', response.data.user)
      return response.data.user
    } catch (err) {
      commit('setCurrentUser', null)
      return null
    }
  },
  async logout({ commit }) {
    await this.$axios.delete('/api/v1/user_session')
    commit('setCurrentUser', null)
  },

}