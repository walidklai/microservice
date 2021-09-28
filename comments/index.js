const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios")
const cors = require("cors")

const app = express();

console.log("ok")

app.use(express.json());

app.use(cors())

const commentsByPostId = {};

app.get("/posts/:id/comments", async (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments",async(req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content ,status:"pending"});

  commentsByPostId[req.params.id] = comments;

  const event = {
    type:"CommentCreated",
    data:{
      id:commentId,
      content,
      postId:req.params.id,
      status:"pending"
    }
  }

 await axios.post("http://localhost:4005/events",event)

  res.status(201).send(comments);
});

app.post("/events",async(req,res)=>{
  console.log(`Recieved event: ${req.body.type}`)
  const {type,data}=req.body

  if(type==="CommentModerated"){
    const {postId,id,status,content}=data
    const comments=commentsByPostId[postId]
    let comment = comments.find(comment=>{
      return comment.id===id
    })
    comment.status=status

    await axios.post("http://localhost:4005/events",{
      type:"CommentUpdated",
      data:{
        id,
        content,
        postId,
        status
      }
    })
  }

  res.sendStatus(200)
})

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
