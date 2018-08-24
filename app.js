
var fs = require('fs')
var csv = require("fast-csv")
var moment = require('moment')
var fileName = './file/my.csv'

var stream = fs.createReadStream(fileName)        //此方法只支持UTF8
stream.setEncoding('utf8')

function saveData(data, callback) {
    setTimeout(function () {
        console.log('* save data:', data)
        console.log('* =================================================================')
        callback(data)
    }, 0)
}

const csvStatic = {
    start: 0,
    length: 100000
}

let data = []
let start = csvStatic.start
let length = csvStatic.length
let times = 0
let first = true
console.log(`---------------------------------------------------------------------------`)
console.log(`* 开始读取[${fileName}]...`)
console.log(`* 片长：${csvStatic.length}`)
console.log(`---------------------------------------------------------------------------`)
console.log(`* startAt:              ${moment().format('YYYY-MM-DD HH:mm:ss')}`)

csv
    .fromStream(stream)
    .validate(function (row, next) {

        if (first) {
            first = false
            return next()
        }

        console.log('* row - ', row)

        start++

        if (start < length) {
            data.push(row)
            next()
        } else {
            times++
            data.push(row)
            console.log(`* 第${times}次保存              ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
            saveData(data, function (result) {
                data = []
                start = csvStatic.start
                length = csvStatic.length
                next();
            })
        }

    })
    .on('data', function (data) {
        console.log('data -', data)
    })
    .on("end", function () {
        if (data.length) {
            console.log('* 最后一块不够片长的保存中')
            saveData(data, function (result) {
                console.log("* 任务完成!");
                console.log(`* endAt:              ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
            })
        } else {
            console.log("* 任务完成!");
        }
        console.log(`* endAt:              ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    });