<<<<<<< HEAD
node_modules
=======
const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())

const posts={}

const PORT = process.env.PORT || 4002

app.get("/posts",(req,res)=>{
    res.send(posts)
})

app.post("/events",(req,res)=>{
    const {type,data} = req.body
    console.log(`Recieved event: ${req.body.type}`)
    if(type==="PostCreated"){
        const{id,title}=data
        posts[id]={id,title,comments:[]}
    }
    if(type==="CommentCreated"){
        const {id,content,postId,status}=data
        const post = posts[postId]
        post.comments.push({id,content,status})
    }
    if(type==="CommentUpdated"){
        const {id,content,postId,status} = data

        const post = posts[postId]

        let comment = post.comments.find(comment=>{
            return comment.id === id
        })
        comment.status=status
        comment.content=content
    }
    res.sendStatus(200)
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
>>>>>>> parent of 3d61614 (end of second vid)
