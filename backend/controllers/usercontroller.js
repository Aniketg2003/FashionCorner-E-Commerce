import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import usermodel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';
import orderModel from "../models/ordermodel.js";



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't Exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credentails' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



const getUserProfile = async (req, res) => {
    try {
        const user = await usermodel.findById(req.body.userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id; // assuming you're using middleware to attach the user
  
      const orders = await orderModel.find({ userId }).sort({ date: -1 });
  
      if (!orders || orders.length === 0) {
        return res.json({ success: true, orders: [] });
      }
  
      res.json({ success: true, orders });
    } catch (error) {
      console.log('getUserOrders error:', error);
      res.json({ success: false, message: error.message });
    }
  };
  
  export default getUserOrders;



//signup
const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // user exist or not
        const exists = await usermodel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" })

        }

        // validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a Valid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a Strong Password" })
        }

        // hashing user pass
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new usermodel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}



//admin
const adminlogin = async (req, res) => {
    try {
        
        const {email,password}=req.body

        if (email=== process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD) {
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
            
        }else{
            res.json({succcess:false,messages:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

        
    }

}



export { loginUser, registeruser, adminlogin , getUserProfile,getUserOrders}