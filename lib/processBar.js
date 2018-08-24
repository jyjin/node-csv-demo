module.exports = (i, length, text = `完成百分比`) => {
    var percent = i / length;
    var strLength = 60
    var strPrcessing = Math.floor(strLength * percent)
    var str = ``
    var j = 0
    while (j < strPrcessing) {
        str += `=`
        j++
    }
    process.stdout.write(`* ${text + ` `}${Number(percent * 100).toFixed(2)}% ${str}\r`)
    if (percent == 1) {
        console.log(`* ${text + ` `}${Number(percent * 100).toFixed(2)}% ${str}\r`)
    }
}