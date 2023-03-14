module.exports.createId = () => {
    var today = new Date();
    return `${today.getFullYear()}${today.getMonth()}${today.getDate()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}${today.getMilliseconds()}`

}

module.exports.otpTimeOut = (min) => {
    let expire = new Date()
    expire.setTime(expire.getTime() + min * 60 * 1000)
    return `${expire.getFullYear()}-${expire.getMonth() + 1}-${expire.getDate()} ${expire.getHours()}:${expire.getMinutes()}:${expire.getSeconds()}`
}