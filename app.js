const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const pug = require('pug')
const port = 3000

app.set('view engine','pug')
app.set('views','./views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

readAllData = (cb) => {
  fs.readFile('./public/data.txt','utf8',(err,_data)=>{
    if(err) console.log("read File"+ err)
    _data = JSON.parse(_data)
    cb(_data)
  })
}
getData = (_id, cb) => {
  fs.readFile('./public/data.txt','utf8',(err,data) => {
    if(err) console.log(err)
    JSON.parse(data).map(val => {
      if(val.id == _id) cb(val)
    })
  })
}

//home
app.get('/',(req,res)=>{
  readAllData((_data) => {
    res.render('index',{data:_data})
  })
})
//create
app.get('/create',(req,res)=>{
  res.render('create')
})
//read
app.get('/read/:id',(req,res)=>{
  getData(req.params.id,(_data) => {
    res.render('read',{data:_data})
  })
})
//update
app.get('/update/:id',(req,res) => {
  getData(req.params.id,(_data) => {
    res.render('update', {data : _data})
  })
})
//api create
app.post('/api/create',(req,res)=>{
    readAllData((_data) => {
      let _id
      if(_data[0] == undefined){
        _id = 1
      } else {
        _id = _data[_data.length-1].id + 1
      }
      _data.push({id:_id,title:req.body.title,des:req.body.des})
      console.log('Data Write')
      fs.writeFile('./public/data.txt',JSON.stringify(_data),(err) => {
        if(err) console.log(err)
        console.log('Data Write Success')
      })
      res.redirect('/')
    })
})
//api delete
app.post('/api/delete/:id',(req,res)=>{
  fs.readFile('./public/data.txt','utf8',(err,_data) => {
    if(err) console.log(err)
    let data = JSON.parse(_data)
    let index
    data.map((val,i)=>{
      if(val.id == req.params.id){
        index = i
        data.splice(index,1)
      }  
    }) 
    fs.writeFile('./public/data.txt',JSON.stringify(data),(err) => {
      if(err) console.log(err)
      console.log('Data delete Success')
      res.sendStatus(200)
    })  
  })
})
//api update
app.post('/api/update/:id',(req,res)=>{
  let newdata = {id:req.params.id, title: req.body.title, des: req.body.des}
  fs.readFile('./public/data.txt','utf8',(err,_data) => {
    if(err) console.log(err)
    let data = JSON.parse(_data)
    let index
    data.map((val,i)=>{
      if(val.id == req.params.id){
        index = i
        data.splice(index,1,newdata)
      }  
    }) 
    fs.writeFile('./public/data.txt',JSON.stringify(data),(err) => {
      if(err) console.log(err)
      console.log('Data delete Success')
      res.redirect('/')
    })  
  })
})
app.listen(port,()=>{
  console.log(`listening at http://localhost:${port}`)
})