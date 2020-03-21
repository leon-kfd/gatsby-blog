// custom typefaces
// import "typeface-montserrat";
// import "typeface-merriweather";
// import "prismjs/themes/prism.css"

import React from 'react'
import { Provider } from 'react-redux'
import createStore from './src/state/createStore'
export const wrapRootElement = ({ element }) => {
  const store = createStore()
  return (
    <Provider store={store}>
      {element}
    </Provider>
  )
}
