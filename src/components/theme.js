import React, { useEffect } from "react"
import { connect } from 'react-redux'
const moonImg = require('../../static/icon/moon.svg')
const sunImg = require('../../static/icon/sun.svg')
const Theme = ({ theme, onChangeTheme }) => {
  const changeTheme = (isLightTheme) => {
    if (!isLightTheme) {
      document.body.setAttribute('class', 'dark')
      onChangeTheme('dark')
    } else {
      document.body.setAttribute('class', 'light')
      onChangeTheme('light')
    }
  }
  useEffect(() => {
    if (theme === 'default') {
      const hour = new Date().getHours()
      changeTheme(hour > 9 && hour < 20)
    } else {
      changeTheme(theme === 'light')
    }
  })
  return (
    <div className={`theme-selector ${theme}`} title="Change Theme" onClick={() => changeTheme(theme === 'dark')}>
      <img src={moonImg} alt="theme-light" />
      <img src={sunImg} alt="theme-dark" />
    </div>
  )
}
export default connect(
  (state) => {
    return {
      theme: state.theme
    }
  },
  (dispatch) => {
    return {
      onChangeTheme: (theme) => {
        dispatch({
          type: 'CHANGE_THEME',
          theme
        })
      }
    }
  }
)(Theme)