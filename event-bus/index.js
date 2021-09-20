const express = require("express")
const axios = require("axios")

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4005

app.post("/events",async(req,res)=>{
    const event = req.body
    await axios.post("http://localhost:4000/events",event)
    await axios.post("http://localhost:4001/events",event)
    await axios.post("http://localhost:4002/events",event)
    await axios.post("http://localhost:4003/events",event)
    res.sendStatus(201)
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})