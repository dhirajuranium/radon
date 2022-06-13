const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")
const OrderController= require("../controllers/orderController")
const ProductController = require ("../controllers/productController")


let mid1=function(req,res,next){
    let isFreeAppUser=req.headers["isfreeappuser"]
    if(isFreeAppUser != undefined){
        console.log("done")
        next()
    }
    else{
        res.send("request is missing a mandatory header")
    }
}



router.post("/createUser",mid1,UserController.createUser)
router.post("/createproduct",ProductController.createProduct)
router.post("/createorder",OrderController.createOrder)












module.exports = router;