/**
* 滚动到指定位置
* @param {number} top 滚到到指定位置的高度
* @param {number} duration 滚动时长
* @param {object} selector 滚动条不在body上时，需传入当前滚动条所在javascriptDom元素
*/
export function scrollTo (top, duration, selector = window) {
  const lastTop = selector === window ? (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) : selector.scrollTop
  const startTime = new Date()
  let timer
  function scrollAnimate () {
    const time = new Date() - startTime
    selector.scrollTo(0, lastTop + (top - lastTop) * (time / duration))
    timer = requestAnimationFrame(scrollAnimate)
    if (time >= duration) {
      selector.scrollTo(0, top)
      cancelAnimationFrame(timer)
    }
  }
  window.requestAnimationFrame(scrollAnimate)
}


/**
* 函数去抖
* @param  func     {Function}   实际要执行的函数
* @param  delay    {Number}     延迟时间，单位是毫秒（ms）
* @return          {Function}
*/
export function debounce (fn, delay = 1000) {
  let timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给func
    var context = this
    var args = arguments

    // 函数被调用，清除定时器
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 func
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}