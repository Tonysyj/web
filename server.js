import http from 'node:http'
import fs from 'node:fs'
import url from 'node:url'
import querystring from 'node:querystring'

const server = http.createServer()
const PORT = 8090

server.listen(PORT, function () {
  console.log(`http://127.0.0.1:${PORT}`);
})

/**
 * require 未来可以简写成req 是网页告诉我们的信息
 * request 未来可以简写成res 是我们告诉网页的信息
 */
// server.on('request', (require, request) => {
//   request.setHeader('Content-type', 'text/html;charset=utf-8') // html版
//   request.setHeader('Content-type', 'text/plain;charset=utf-8') // 纯文本版
//   request.write('Hello World\n')
//   request.write('你好\n')
//   request.write('<h1>你好</h1>')
//   request.end()
// })

server.on('request', (req, res) => {
  if (req.url === '/') {
    fs.readFile('./public/index.html', 'utf-8', function (err, data) {
      res.write(data)
      res.end()
    })
  } else {
    fs.readFile('./public/' + req.url, 'utf-8', function (err, data) {
      res.end(data)
      /**
       * else里面写成：
       * res.write(data)
       * res.end()
       * 会报错
       */
    })
  }
})

server.on('request', (req, res) => {
  // console.log(req.method);
  if(req.method === 'GET'){
    const query = url.parse(req.url, true)['query']
    console.log({...query});
  }

  if(req.method === 'POST'){
    let allData = ''
    req.on('data', function(data){
      allData += data
      console.log(data);
    })
    req.on('end', function(){
      const receiveData = querystring.parse(allData)
      console.log(receiveData);
    })
  }
})