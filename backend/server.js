import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudnary.js'
import userrouter from './routes/userroute.js'
import productRouter from './routes/productroute.js'
import cartRouter from './routes/cartrout.js'
import orderRouter from './routes/orderroute.js'
import userRoutes from './routes/userroute.js';
import router from './routes/reviewRoute.js';


//app config

const app=express()
const port =process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())


//api end point 
app.use ('/api/user',userrouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/review', router);
app.use('/api', userRoutes);
app.use('/api/user', userRoutes);

app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>console.log('server started on PORT:'+port))