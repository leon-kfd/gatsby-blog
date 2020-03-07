import React from "react"
import { scrollTo } from '../utils/helper'
const toTopImg = require('../../static/top.svg')

class ToTop extends React.Component {
  constructor(props) {
    super(props)
    this.onScrollWatch = this.onScrollWatch.bind(this)
    this.state = {
      showToTop: false
    }
    window.addEventListener('scroll', this.onScrollWatch)
  }

  onScrollWatch () {
    let scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    let showToTop = scrollTop > 200
    this.setState({ showToTop })
  }

  handleClick () {
    scrollTo(0, 400)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScrollWatch)
  }

  render () {
    const showToTop = this.state.showToTop
    return (
      <div className={`to-top ${showToTop && 'active'}`} onClick={this.handleClick}>
        <img src={toTopImg} alt="to-top" />
      </div>
    )
  }
}

export default ToTop