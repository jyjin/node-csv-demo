var fs = require(`fs`)
var moment = require(`moment`)
var iconv = require(`iconv-lite`)
var _ = require(`lodash`)
var async = require(`async`)
var processBar = require('./lib/processBar')

const csvStatic = {
    fileName: `./file/my.csv`,
    length: 2
}

var readCsv = () => {
    console.log(`* 开始读取[${csvStatic.fileName}]\t\t\t\t\t${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    var t = setInterval(function () {
        process.stdout.write(`* Reading .\r`)
        process.stdout.write(`* Reading ..\r`)
        process.stdout.write(`* Reading ...\r`)
    })

    var buffer = Buffer.from(fs.readFileSync(csvStatic.fileName, { encoding: `binary` }), `binary`);
    var text = iconv.decode(buffer, `GBK`);             //使用GBK解码
    var data = text.split(`\r\n`)
    data.shift(0)                                       //去除表头
    var newData = []
    data.map(function (item) {
        newData.push(item.split(`,`))
    })
    clearInterval(t)
    console.log(`* Reading ...\r`)
    console.log(`* 读取完成\t\t\t\t\t\t\t${moment().format('YYYY-MM-DD HH:mm:ss')}\n`)
    return newData
}

function saveData(data, callback) {
    setTimeout(function () {
        console.log(`* save data:`, data)
        console.log(`* =================================================================`)
        callback(data)
    }, 0)
}
var data = readCsv()
var dataArr = _.chunk(data, csvStatic.length)


var i = 0
console.log(`* 开始保存数据\t\t\t\t\t\t\t${moment().format('YYYY-MM-DD HH:mm:ss')}`)
async.eachSeries(dataArr, (item, cb) => {      // 如果有事务 只能用eachSeries同步发送 其他可用each异步执行
    processBar(++i, dataArr.length, `保存进度`)
    saveData(item, cb)
}, (err, result) => {
    console.log(`* 任务完成！\t\t\t\t\t\t\t${moment().format('YYYY-MM-DD HH:mm:ss')}`)
})




