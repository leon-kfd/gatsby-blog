import { createStore as reduxCreateStore } from "redux"
const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.theme
      }
    default:
      return state
  }
}
const initialState = {
  theme: 'default'
}
const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore