import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
const path = require('path')

import rolesRoutes from './routes/roles.js'
import permisosRoutes from './routes/permisos.js'
import userRoutes from './routes/user.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use('/roles', rolesRoutes)
app.use('/permisos', permisosRoutes)
app.use('/users', userRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000

const CONNECTION_URL = 'mongodb+srv://mongo:BELC6ZxeB53MnQza@rolescluster.u7c3e.mongodb.net/rolesDB?retryWrites=true&w=majority'

mongoose.connect(process.env.CONNECTION_URL || CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

// app.get('/', (req, res) => {
//     res.send('Welcome to Roles API')
// })