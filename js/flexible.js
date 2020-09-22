(function flexible (window, document) {
    //获取html的根元素
    var docEl = document.documentElement
    //获取物理像素比
    var dpr = window.devicePixelRatio || 1
  
    // adjust body font size 设置body的字体大小
    function setBodyFontSize () {
      if (document.body) {
          //如果页面有body。就设置body的字体大小
        document.body.style.fontSize = (12 * dpr) + 'px'
      }
      else {
          //如果页面中没有body元素，则调用DOM元素加载方法之后再调用设置字体大小的方法
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    setBodyFontSize();
  
    // set 1rem = viewWidth / 10  设置html元素的文字大小
    function setRemUnit () {
      var rem = docEl.clientWidth / 10
      docEl.style.fontSize = rem + 'px'
    }
  
    setRemUnit()
  
    // reset rem unit on page resize 当页面的尺寸大小发生变化时，重新设置html元素的字体大小
    window.addEventListener('resize', setRemUnit)
    //pageshow事件：页面重新加载触发的事件
    window.addEventListener('pageshow', function (e) {
        //e.persisted 返回的是true，说明这个页面是从缓存取过来的页面，也需要重新设置html元素的字体大小
      if (e.persisted) {
        setRemUnit()
      }
    })
  
    // detect 0.5px supports  有些移动端的浏览器不支持0.5像素的写法
    if (dpr >= 2) {
      var fakeBody = document.createElement('body')
      var testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document))