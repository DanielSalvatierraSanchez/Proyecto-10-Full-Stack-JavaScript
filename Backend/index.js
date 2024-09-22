require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./src/config/db')

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.use('*', (req, res, next) => {
    return res.status(404).json('✅ Route Not Found')
})

app.listen(3000, () => {
    console.log('✅ Server is up 🚀 http://localhost/3000')
})
