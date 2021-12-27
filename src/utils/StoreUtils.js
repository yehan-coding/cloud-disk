const localStore = {
  getItem (key) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  },
  setItem (key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  removeItem (key) {
    localStorage.removeItem(key)
  }
}

export {
  localStore
}
