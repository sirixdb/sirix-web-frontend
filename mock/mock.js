import Mock from 'mockjs'

const Random = Mock.Random

var listData = function () {
    let _data = []

    for (let i = 0; i < 50; i++) {
        let newList = {

            revision: Random.integer(1, 500),
            revisionTimestamp: Random.datetime('yyyy-MM-dd HH:mm:ss.SSZ'),
            author: Random.name(),
            commitMessage: Random.sentence()
        }
        _data.push(newList)
    }
    return _data
}
var countData = function () {
    let _data = Random.integer(1, 500)

    return {
        count: _data
    }
}

// this rest api path will mock data
Mock.mock('http://localhost:3002/api/history', 'get', listData)
Mock.mock('http://localhost:3002/api/counts', 'get', countData)