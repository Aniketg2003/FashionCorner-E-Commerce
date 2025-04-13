import express from "express";
import { loginUser,registeruser,adminlogin } from "../controllers/usercontroller.js";
import { getUserProfile,getUserOrders } from '../controllers/usercontroller.js';
import authUser from '../middleware/auth.js';
import usermodel from '../models/usermodel.js';


const userrouter =express.Router();

userrouter.post('/register',registeruser)
userrouter.post('/login',loginUser)
userrouter.post('/admin',adminlogin)
userrouter.get('/user', authUser, getUserProfile);
userrouter.post('/userorders', authUser, getUserOrders);
userrouter.get('/', authUser, async (req, res) => {
    try {
      const user = await usermodel.findById(req.body.userId).select('-password');
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user });
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  });

export default userrouter;