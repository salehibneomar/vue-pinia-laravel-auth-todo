export const setToken = (token) => {
  localStorage.setItem('bearer_token', token)
}

export const hasToken = () => {
  return localStorage.getItem('bearer_token')
}

export const removeToken = () => {
  localStorage.removeItem('bearer_token')
}

export const getToken = () => {
  return localStorage.getItem('bearer_token')
}
