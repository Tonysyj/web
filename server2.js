import * as Router from "./src/router.js";
import * as Controller from "./src/controller.js"
import http from 'node:http'

const server = http.createServer()
const PORT = 8090

server.listen(PORT, function () {
  console.log(`http://127.0.0.1:${PORT}`);
})

server.on('request', (req, res) => {
  Router.router(req, res)
})

// 调用功能
Router.getFuncList.push(
  Controller.loadPage,
  Controller.getAnalysis,
  Controller.someFunc
)

Router.postFuncList.push(
  Controller.postAnalysis
)