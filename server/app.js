import "../server/config/env.config.js"
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import apiResponse from './utils/apiResponse.js'
const corsOptions ={
    origin : process.env.CLIENT_URL,
    credentials: true
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import aiRouter from './routes/ai.routes.js'
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/ai', aiRouter)


app.get('/', async(req, res)=>{
    const userAgent = req.headers["user-agent"] || "Unknown";
    const ipAddress = req.ip || req.connection.remoteAddress;
    
    res.status(200).json({success: true, message:"good to go", userAgent, ipAddress})
})

app.use((err, req, res, next)=>{
    console.error("Error: ", err)
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    apiResponse.error(res, message,{},statusCode)
})

export default app;