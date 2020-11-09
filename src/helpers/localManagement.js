const KEY_TOKEN = "JWT"
const KEY_ROLE = "ROLE"


export default {
  KEY_TOKEN,
  KEY_ROLE,
  set(key, payload) {
    localStorage.setItem(key, payload)
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  get(key) {
    return localStorage.getItem(key)
  }
}