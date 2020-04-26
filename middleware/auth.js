export default ({ store, route, redirect }) => {
  store.dispatch('auth/getCurrentUser').then(res => {
    const currentUser = store.getters['auth/currentUser']
    if (currentUser) return

    const requiresAuth = route.meta.some(metaData => metaData.requiresAuth)
    if (requiresAuth) return redirect('/user_session/new')
  })
}