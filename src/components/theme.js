import React, { useState, useEffect } from "react"
const moonImg = require('../../static/icon/moon.svg')
const sunImg = require('../../static/icon/sun.svg')
const Theme = (props) => {
  console.log(props)
  const [isLightTheme, setIsLightTheme] = useState(true)
  const changeTheme = (isLightTheme) => {
    if (!isLightTheme) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setIsLightTheme(isLightTheme)
  }
  useEffect(() => {
    changeTheme(localStorage.getItem('theme') !== 'dark')
  })
  return (
    <div className={`theme-selector ${isLightTheme ? 'light' : 'dark'}`} title="Change Theme" onClick={() => changeTheme(!isLightTheme)}>
      <img src={moonImg} alt="theme-light" />
      <img src={sunImg} alt="theme-dark" />
    </div>
  )
}
export default Theme