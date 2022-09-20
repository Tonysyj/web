import fs from 'node:fs'
import url from 'node:url'

/**@loadPage 加载页面 */
function loadPage(req, res){
  if (req.url === '/') {
    fs.readFile('./public/index.html', 'utf-8', function (err, data) {
      res.write(data)
      res.end()
    })
  } else {
    fs.readFile('./public/' + req.url, 'utf-8', function (err, data) {
      res.end(data)
    })
  }
}

/**@getAnalysis GET数据分析 */
function getAnalysis(req, res){
  if(req.method === 'GET'){
    const query = url.parse(req.url, true)['query']
    console.log({...query});
  }
}

/**@postAnalysis POST数据分析 */
function postAnalysis(req, res, receiveData){
  console.log(receiveData);
}

function someFunc(req, res){
  console.log('someFunc');
}

export {loadPage, getAnalysis, postAnalysis, someFunc}