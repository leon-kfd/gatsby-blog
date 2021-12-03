import React, { useEffect } from "react"
import { connect } from 'react-redux'
import moonImg from '../../static/icon/moon.svg'
import sunImg from '../../static/icon/sun.svg'
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
      changeTheme(hour >= 8 && hour < 19)
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