
function addZero(n) {
    return n < 10 ? '0' + n : n
}

function dateStr(d = new Date()) {
    return d.getFullYear() + '-'
        + addZero(d.getMonth() + 1) + '-'
        + addZero(d.getDay()) + ' '
        + addZero(d.getHours()) + ':'
        + addZero(d.getMinutes()) + ':'
        + addZero(d.getSeconds()) + ' '
        // + d.getMilliseconds()
}

module.exports = dateStr