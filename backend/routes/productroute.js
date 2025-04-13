import express from "express";
import {listProducts,singleProduct,removeProduct,addProduct} from "../controllers/productcontroller.js"
import upload from "../middleware/multer.js";
import adminauthi from "../middleware/adminauthi.js";

const productRouter= express.Router();

productRouter.post('/add',adminauthi,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1} ]),addProduct);
productRouter.post('/remove',adminauthi,removeProduct);
productRouter.get('/list',listProducts);
productRouter.post('/single',singleProduct);


export default productRouter
