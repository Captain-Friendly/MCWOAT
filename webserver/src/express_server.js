import express from 'express'
import { convertToObject } from 'typescript';

const app = express()
const port = 5173;
let URL = (true) ? "go-server" : "localhost";
app.use(express.static('dist'))
app.get('/getUsers', async (req, res) => {
  // console.log("your mama")
  // const response = await fetch(URL+":3333/getUsers")
  const response = await fetch('http://go-server:3333/getUsers');
  res.send(await response.text())
    
})
app.get('/addUser', async (req, res) => {
  console.log("add user request sent")
  console.log(req.originalUrl)
  const response = await fetch(`http://go-server:3333${req.originalUrl}`);
  res.send(await response.text())
    
})

app.get('/Hello', (req, res) =>{
  res.send("bitch")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})