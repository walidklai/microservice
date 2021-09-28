const express = require("express")
const axios = require("axios")

const app = express()

app.use(express.json())

app.post("/events",async(req,res)=>{
    console.log(`Recieved event: ${req.body.type}`)
    const {type,data}=req.body

    if(type==="CommentCreated"){
        const status = data.content.includes("orange") ?"rejected":"approved"
        await axios.post("http://localhost:4005/events",{
            type:"CommentModerated",
            data:{
                id:data.id,
                postId:data.postId,
                status,
                content:data.content
            }
        })
    }
    res.sendStatus(200)
})

const PORT = process.env.PORT || 4003

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})