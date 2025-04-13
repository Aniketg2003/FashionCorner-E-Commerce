import express from 'express'
import { allOrder,placeOrder,placeOrderRazorpay,placeOrderStripe,updateStatus,userOrder, verifyStripe } from '../controllers/ordercontroller.js'
import adminauthi from '../middleware/adminauthi.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//admin
orderRouter.post('/list',adminauthi,allOrder)
orderRouter.post('/status',adminauthi,updateStatus)

//payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//user
orderRouter.post('/userorders',authUser,userOrder)


//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter

