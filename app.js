const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

let data = [
  {
    id: 1,
    title:
      "Hello 1",
    des:
      "example 1",
  },
  {
    id: 2,
    title:
      "Hello 2",
    des:
      "example 2",
  },
  {
    id: 3,
    title: "ㄴㄷ고",
    des: "ㄴㄷ고",
  },
  {
    id: 4,
    title:
      "안녕하세용.",
    des:
      "테스트입니다.",
  }
];

app.get('/api/readcontents',(req,res)=>{
    res.send(data) 
})

app.get('/create',(req,res)=>{
  res.sendFile(__dirname+'/public/create.html')
})

app.get('/:id',(req,res)=>{
  console.log(req.params.id)
  console.log(data[1].id)
  let content
  for(let i = 0; i < data.length; i++){
    if(data[i].id == req.params.id){
      content = data[i]
    }
  }
  console.log(content)
  res.send(content)
})

app.post('/api/create',(req,res)=>{
    const _id = data.length+1
    data.push({id:_id,title:req.body.title,des:req.body.des})
    console.log('data push')
    fs.writeFile('./public/data.txt',JSON.stringify(data),'utf8',(err)=>{
      if(err) throw err;
      console.log('write complete')
    })
    res.redirect('/')
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})