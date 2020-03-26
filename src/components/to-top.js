import React, { useState, useEffect } from "react"
import { scrollTo } from '../utils/helper'
const toTopImg = require('../../static/icon/top.svg')
const ToTop = () => {
  const [showToTop, setShowToTop] = useState(false)
  // const [isSupportScrollBehavior, setIsSupportScrollBehavior] = useState(false)
  const handleClick = () => {
    // if (!isSupportScrollBehavior) {
    //   scrollTo(0, 400)
    // }
    scrollTo(0, 400)
  }
  useEffect(() => {
    // setIsSupportScrollBehavior(Object.keys(document.documentElement.style).findIndex((key) => key === 'scrollBehavior') > -1)
    const onScrollWatch = () => setShowToTop((document.body.scrollTop + document.documentElement.scrollTop) > 200)
    window.addEventListener('scroll', onScrollWatch)
    return () => { window.removeEventListener('scroll', onScrollWatch) }
  }, [])
  return (
    <a href="#___gatsby">
      <div className={`to-top ${showToTop && 'active'}`} onClick={() => handleClick()} title="Back To Top">
        <img src={toTopImg} alt="to-top" />
      </div>
    </a>
  )
}
export default ToTop
