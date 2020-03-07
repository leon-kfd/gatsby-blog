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
  }

  onScrollWatch () {
    let scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    let showToTop = scrollTop > 200
    this.setState({ showToTop })
  }

  handleClick () {
    scrollTo(0, 400)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScrollWatch)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScrollWatch)
  }

  render () {
    const showToTop = this.state.showToTop
    return (
      <div role="button" tabIndex="0" className={`to-top ${showToTop && 'active'}`} onClick={this.handleClick}>
        <img src={toTopImg} alt="to-top" />
      </div>
    )
  }
}

export default ToTop