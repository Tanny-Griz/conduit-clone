export default function userManagementMiddleWare ({ store, redirect }) {
  if (!store.getters['auth/isLoggedIn']) {
    return redirect('/no-access')
  }
}
