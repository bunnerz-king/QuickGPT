import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'

const app = express()

await connectDB();

// middleware
app.use(cors())
app.use(express.json())


// routes
app.get('/', (req, res)=> res.send('server is live'));
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

app.use((err, req, res, next) => {
  console.error(err.stack); // optional: log for debugging
  console.log("here")
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})