import express from 'express'
import cors from 'cors'
import Pusher from 'pusher'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/user.js'

dotenv.config()

const pusher = new Pusher({
  appId: "1622864",
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap1",
  useTLS: true
});

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/chats', async (req, res) => {
    await pusher.trigger("chat-channel", "chat", {
        username: req.body.username,
        chat: req.body.chat
    })

    res.status(200).json({message: "/api/chats/ POST success."})
})

app.post('/api/register', async (req, res) => {
  const userModel = new User({
    username: req.body.username,
    password: req.body.password
  })

  const savedUser = await userModel.save()
  res.json(savedUser)
})

app.get('/api/login/', async (req, res) => {
  const [user] = await User.find({ "username": req.body.username, "password": req.body.password })
  res.json({_id: user.id})
})

mongoose.connect(process.env.DB_CONSTRING, { useNewUrlParser: true })
	.then(() => console.log("db connection success"), err => console.log(err));

console.log(`Listening on port: ${process.env.PORT}`)
app.listen(process.env.PORT)