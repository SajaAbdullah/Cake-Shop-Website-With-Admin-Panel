const storeToken = (value) => {
  if (value) {
    // console.log("Store Token")
    const { access, refresh} = value
    sessionStorage.setItem('access_token', access)
    sessionStorage.setItem('refresh_token', refresh)
  }
}

const getToken = () => {
  let access_token = sessionStorage.getItem('access_token')
  let refresh_token = sessionStorage.getItem('refresh_token')
  return { access_token, refresh_token }
}

const removeToken = () => {
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('refresh_token')
}

export { storeToken, getToken, removeToken }