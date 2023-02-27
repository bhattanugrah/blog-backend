import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import blogRoute from './routes/blog'
import userRoute from './routes/users'
import authRoute  from './routes/auth'


import { connectToDatabase } from './utils/db'

dotenv.config()


const app = express()
app.use(express.json())
const port = '3002'

app.use(cors())


app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)



const start = async() => {
    await connectToDatabase()
    app.listen(port, () => {
        console.log(`Server is running on Port ${port}`)
    })
}

start()