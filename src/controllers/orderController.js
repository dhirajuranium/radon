const OrderModel = require("../models/orderModel")
const ProductModel = require("../models/productModel")
const UserModel = require("../models/userModel")

const createOrder = async function (req, res) {
    console.log("my first order");
    let order = req.body
    let userIdd = order.userId
    let productIdd = order.productId

    if (!userIdd) return res.send("UserId Must be present");

    let user = await UserModel.findById(userIdd)
    if (!user) return res.send("the request is not valid no user is present with the given user Id ")

    if (!productIdd) return res.send("ProductId must be present");

    let product = await ProductModel.findById(productIdd)
    if (!product) return res.send("the request is not valid no product is present with the given product Id")


    let orderCreate = await OrderModel.create(order);
    console.log(orderCreate)
    let value = req.headers["isFreeAppUser"]

    if (value == "true") {
        let customer = await OrderModel.findOneAndUpdate(
            { userId: userIdd },
            { $set: { amount: 0, isFreeAppUser: true } },
            { $new: true }
        )
        return res.send({ data: customer })
    }
    else {
        let userBalance = await UserModel.findById(userIdd)
        let productAmount = await ProductModel.findById(productIdd)
        let pay = userBalance.balance - productAmount.price
        if (pay >= 0) {
            let customerOrder = await OrderModel.findOneAndUpdate(
                { userId: userIdd },
                { $set: { amount: productAmount.price, isFreeAppUser: true } },
                { $new: true }
            )
            let customer = await UserModel.findOneAndUpdate(
                { _id: userIdd },
                { $set: { balance: pay, isFreeAppUser: true } },
                { $new: true }

            )
            let result = {}
            result.order = customerOrder
            result.user = customer

            return res.send({ data: result })

        } else {
            return res.send({ msg: "insufficiant balance" })
        }
    }



}



module.exports.createOrder = createOrder