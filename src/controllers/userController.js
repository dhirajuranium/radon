const UserModel = require("../models/userModel")

const createUser = async function (req, res) {
    let user = req.body
    let userData = await UserModel.create(user)
    res.send({ msg: userData })
}


module.exports.createUser = createUser
