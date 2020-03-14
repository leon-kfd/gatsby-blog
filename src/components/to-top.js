import React from "react"
import { scrollTo } from '../utils/helper'
const toTopImg = require('../../static/top.svg')

class ToTop extends React.Component {
  constructor(props) {
    super(props)
    this.onScrollWatch = this.onScrollWatch.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      showToTop: false,
      isSupportScrollBehavior: false
    }
  }

  onScrollWatch () {
    let scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    let showToTop = scrollTop > 200
    this.setState({ showToTop })
  }

  handleClick () {
    if (!this.state.isSupportScrollBehavior) {
      scrollTo(0, 400)
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScrollWatch)
    this.setState({
      isSupportScrollBehavior: Object.keys(document.documentElement.style).findIndex((key) => key === 'scrollBehavior') > -1
    })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScrollWatch)
  }

  render () {
    const showToTop = this.state.showToTop
    return (
      <a href="#___gatsby">
        <div className={`to-top ${showToTop && 'active'}`} onClick={this.handleClick}>
          <img src={toTopImg} alt="to-top" />
        </div>
      </a>
    )
  }
}

export default ToTop