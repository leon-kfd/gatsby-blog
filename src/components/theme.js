import React from "react"
const moonImg = require('../../static/icon/moon.svg')
const sunImg = require('../../static/icon/sun.svg')

class Theme extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isLightTheme: true
    }
  }

  handleClick () {
    let { isLightTheme } = this.state
    this.setState({
      isLightTheme: !isLightTheme
    })
    this.setTheme(!isLightTheme)
  }

  setTheme (isLightTheme) {
    if (!isLightTheme) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  componentWillMount () {
    let theme = localStorage.getItem('theme') || 'light'
    this.setState({
      isLightTheme: theme === 'light'
    })
    this.setTheme(theme === 'light')
  }

  render () {
    const { isLightTheme } = this.state
    return (
      <div className={`theme-selector`} title="Change Theme" onClick={this.handleClick}>
        {isLightTheme ? <img src={moonImg} alt="theme-light" /> : <img src={sunImg} alt="theme-dark" />}
      </div>
    )
  }
}

export default Theme