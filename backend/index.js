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
    const {username, chat, timestamp} = req.body

    await pusher.trigger("chat-channel", "chat", {
        username: username,
        chat: chat,
        timestamp: timestamp
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

app.post('/api/login', async (req, res) => {
  const {username, password} = req.body
  const exists = await User.findOne({ username: username, password: password })
  res.json(exists)
})

mongoose.connect(process.env.DB_CONSTRING, { useNewUrlParser: true })
	.then(() => console.log("db connection success"), err => console.log(err));

console.log(`Listening on port: ${process.env.PORT}`)
app.listen(process.env.PORT)