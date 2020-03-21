
import { combineReducers } from 'redux'

const toChangeTheme = function (state = { theme: 'dark' }, action) {
  switch (action.type) {
    case 'setLightTheme':
      return { theme: 'light' }
    case 'setDarkTheme':
      return { theme: 'dark' }
    default:
      return state
  }
}

export default combineReducers({
  toChangeTheme
})

export { toChangeTheme }