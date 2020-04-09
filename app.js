const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

let data = [];

fs.exists('./public/data.txt',function(exists){
  console.log(exists ? "it'there" : opendata())
  readdata()
})
readdata = ()=> {
  console.log('readdata')
  fs.readFile('./public/data.txt','utf8',(err,_data)=>{
    if(err) throw err;
    let json = JSON.parse(_data)
    data = json
  })

}

app.get('/api/readcontents',(req,res)=>{
    res.send(data) 
})

app.get('/create',(req,res)=>{
  res.sendFile(__dirname+'/public/create.html')
})

app.post('/api/create',(req,res)=>{
    const _id = data.length
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