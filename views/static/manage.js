"use strict"

/* json data headeer. */
const JSON_HEADER = new Headers({
    "Content-Type": "application/json"
})

/* 生成缓存区 */
function Generation(uid) {return {
    name: null,
    detil: null,
    images: [],
    uid
}}

/* 数据模型 */
const Model = {
    Values: [],
    ViewUrl: null,
    ViewShow: null,
    TouchShow: false,
    CreateName: false,
    QrcodeShow: false,
    UpdateImage: false,
    Generation: Generation(null)
}

/**
 * FormData
 * @param {File} [value]
 * @returns {FormData}
 * @private
 */
function Froms(value) {
    const form = new FormData()
    form.append("image", value)
    return form
}

/**
 * 创建文件上传任务
 * @param {string} uid
 * @param {File} value
 * @param {number} index
 * @returns {promise<void>}
 * @private
 */
async function Proify(uid, value, index) {
    const baseUrl = "/upload?name=" + [uid, index].join("-")
    const [body, method] = [Froms(value), "POST"]
    return await fetch(baseUrl, { method, body })
}

/**
 * 上传所有文件
 * @param {[]File} images
 * @returns {promise<void>}
 * @private
 */
function UploadAll({ uid, images }) {
    return images.map((v, i) => Proify(uid, v, i))
}

/**
 * 上传海报
 * @param {string} [uid]
 * @param {[]string} [Images]
 * @param {string} [Name]
 * @param {string} [Detil]
 * @returns {promise<void>}
 * @private
 */
async function PosterPut(Generation) {
    let value = {...Generation}
    let option = {}
    let { uid } = Generation
    let images = Generation.images
        .map((_, i) => [uid, i].join("-"))
    Object.assign(value, {images})
    Object.assign(value, {date: Date.now()})
    Object.assign(option, {body: JSON.stringify(value)})
    Object.assign(option, {headers: JSON_HEADER})
    Object.assign(option, {method: "POST"})
    return await fetch("/poster/" + uid, option)
}

/**
 * uid生成
 * @returns {string}
 * @private
 */
function Uid() {
    const rand = Math.round(Math.random() * 10)
    const date = String(Date.now())
    return [rand, date].join("-")
}

/**
 * 新建海报
 * @returns {void}
 */
function create() {
    this.Generation = Generation(Uid())
    this.TouchShow = true
    this.CreateName = true
}

/**
 * 上传图片
 * @returns {void}
 * @private
 */
function update() {
    if (!this.Generation.name) 
        return alert("请输入海报名称")
    this.CreateName = false
    this.UpdateImage = true
    this.QrcodeShow = false
}

/**
 * 取消新建
 * @returns {void}
 * @private
 */
function close() {
    this.TouchShow = false
    this.CreateName = false
    this.QrcodeShow = false
    this.UpdateImage = false
}

/**
 * 选择文件
 * @param {Event} event
 * @returns {void}
 * @private
 */
function fileChange({ target: { files }}) {
    this.Generation.images.push(files[0])
}

/**
 * 转URL
 * @param {File} value
 * @returns {void}
 * @private
 */
function intoUrl(value) {
    return window.URL.createObjectURL(value)
}

/**
 * 二维码
 * @returns {void}
 * @private
 */
function qrcode() {
    const elem = document.getElementById("qrcode")
    if (this.Generation.images.length === 0) 
        return alert("未选择海报图片")
    elem.innerHTML = ""
    new QRCode(elem, [
        location.origin, 
        this.Generation.uid
    ].join("/poster/"))
    this.QrcodeShow = true
    this.CreateName = false
    this.UpdateImage = false
}

/**
 * 完成
 * 上传海报
 * @returns {void}
 * @private
 */
async function done() {
    const date = Date.now()
    const { uid } = this.Generation
    const poster = { ...this.Generation, date }
    await Promise.all(UploadAll(this.Generation))
    await PosterPut(this.Generation)
    this.Values.push({ uid, poster })
    this.close()
}

/**
 * 预览海报
 * @param {string} uid
 * @returns {void}
 * @private
 */
function view(uid) {
    const elem = document.getElementById("ViewQrcode")
    elem.innerHTML = ""
    new QRCode(elem, [
        location.origin, uid
    ].join("/poster/"))
    this.ViewUrl = "/poster/" + uid
    this.ViewShow = true
    this.TouchShow = true
}

/**
 * 删除海报
 * @param {string} uid
 * @returns {void}
 * @private
 */
async function remove(uid) {
    const method = "DELETE"
    await fetch("/poster/" + uid, { method })
    this.Values = this.Values
        .filter(x => x.uid !== uid)
}

/**
 * 页面加载完成
 * 创建Vue实例
 */
window.onload = () => new Vue({
    el: ".App",
    data: Model,
    methods: {
        fileChange,
        create,
        close,
        update,
        intoUrl,
        qrcode,
        remove,
        done,
        view
    },
    async created() {
        this.Values = await fetch("/posters")
            .then(x => x.json()) || []
    }
})