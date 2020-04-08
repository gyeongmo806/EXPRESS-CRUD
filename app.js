const express = require('express')
const app = express()
const port = 3000

const data = [
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
];

app.get('/api/readcontents',(req,res)=>{
    res.send(data)
})


app.get('/',(req,res)=>{
    res.sendfile('./index.html')
})

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})