import querystring from 'node:querystring'

const getFuncList = []
const postFuncList = []

function router(req, res){
  switch(req.method){
    case 'GET':
      getFunc(req, res)
      break;
    case 'POST':
      postFunc(req, res)
      break;
    default:
      break;
  }
}

function getFunc(req, res){
  console.log('getFunc');
  getFuncList.forEach(func => {
    func(req, res)
  })
}

function postFunc(req, res){
  console.log('postFunc');
  let allData = ''
    req.on('data', function(data){
      allData += data
      console.log(data);
    })
    req.on('end', function(){
      const receiveData = querystring.parse(allData)
      postFuncList.forEach(func => {
        func(req, res, receiveData)
      })
    })
}

export{router, getFuncList, postFuncList}