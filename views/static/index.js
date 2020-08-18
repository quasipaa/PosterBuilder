"use strict"

window.onload = function() {
    let Index = 0
    let TouchX = 0
    let TouchLine = 0
    let Count = document.getElementById("Count")
    let IndexElem = document.getElementById("Index")
    let Poster = document.querySelector(".Poster")
    let Box = document.querySelector(".Poster .Box")
    let Posters = document.querySelectorAll(".Poster img")
    let Width = document.documentElement.clientWidth
    let UIndex = Posters.length * -1 + 1
    let Rate = Width * 0.6
    let URate = Rate * -1
    
    /**
     * 触摸开始
     * @param {TouchEvent} event 事件
     * @returns {void}
     * @private
     */
    function handleStart(event) {
        event.preventDefault()
        const {changedTouches: [{pageX}]} = event
        TouchX = pageX
    }
    
    /**
     * 触摸移动
     * @param {TouchEvent} event 事件
     * @returns {void}
     * @private
     */
    function handleMove(event) {
        event.preventDefault()
        const {changedTouches: [{pageX}]} = event
        TouchLine = pageX - TouchX
    }
    
    /**
     * 触摸结束
     * @param {TouchEvent} event 事件
     * @returns {void}
     * @private
     */
    function handleEnd(event) {
        event.preventDefault()
        let index = null
        if (TouchLine > 0 && TouchLine >= Rate) index = Index + 1
        if (TouchLine < 0 && TouchLine <= URate) index = Index - 1
        if (index == null || index == Index) return null
        if (index > 0 || index < UIndex) return null
        Box.style.left = index * Width + "px"
        IndexElem.innerHTML = index * -1 + 1
        Index = index
        TouchLine = 0
        TouchX = 0
    }
    
    // 绑定主视图的触摸事件
    Poster.addEventListener("touchstart", handleStart, false)
    Poster.addEventListener("touchmove", handleMove, false)
    Poster.addEventListener("touchend", handleEnd, false)
    
    // 排列所有图片
    // 初始化翻页数
    Box.style.width = Width * Posters.length + "px"
    Posters.forEach((elem, index) => elem.style.width = Width + "px")
    Count.innerHTML = "* " + Posters.length
}