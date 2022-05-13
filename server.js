import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

import rolesRoutes from './routes/roles.js'
import permisosRoutes from './routes/permisos.js'
import userRoutes from './routes/user.js'

// import XLSX from 'xlsx'
// import Permiso from './models/permisosModel.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const filePath = __dirname+'/client/public/exportdata.xlsx'
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors())

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use('/roles', rolesRoutes)
app.use('/permisos', permisosRoutes)
app.use('/users', userRoutes)

// https://github.com/ashwanibakshi/mongodb_to_excel/blob/master/views/home.ejs
// https://stackoverflow.com/questions/32307636/export-mongodb-collection-data-to-csv-file-in-node-js

// https://www.youtube.com/watch?v=zL_PcpvRk-M
// https://www.youtube.com/results?search_query=Export+mongoDb+data+to+an+excel+file+format
// https://stackoverflow.com/questions/49296787/export-mongodb-data-to-an-excel-file-format

// https://stackoverflow.com/questions/48553958/how-to-download-an-excel-xlsx-file-using-angular-5-httpclient-get-method-with

// app.get('/exportpermisos', (req, res) => {
//     const wb = XLSX.utils.book_new()
//     Permiso.find((err, data) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             console.log(data)
//             let temp = JSON.stringify(data)
//             temp = JSON.parse(temp)
//             console.log(temp)
//             const ws = XLSX.utils.json_to_sheet(temp)
//             const down = __dirname+'/client/public/exportdata.xlsx'
//             XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
//             XLSX.writeFile(wb, down)
//             res.sendFile(down)
//         }    
//     })
// })

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