const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// 1. API
const createUser = async function (abcd, xyz) {
    try {
        let data = abcd.body;
        if (Object.keys(data).length == 0)
            return xyz.status(400).send({ status: false, msg: "user details is required to crate account" })

        let savedData = await userModel.create(data);
        console.log("user created");
        xyz.status(201).send({ msg: savedData });
    } catch (err) {
        xyz.status(500).send({ status: false, msg: err.message })
    }
};


//2 . API
const loginUser = async function (req, res) {
    try{
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });

    if (!user)
        return res.status(400).send({
            status: false,
            msg: "username or the password is not corerct",
        });

    let token = jwt.sign(
        {
            userId: user._id.toString(),
            batch: "radon",
            organisation: "FunctionUp",
        },
        "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, token: token });
    } catch(error){
        res.status(500).send({status:false,msg:res.message})
    }
};


// 3. API
const getUserData = async function (req, res) {
    try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

    console.log(token);

    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
        return res.status(400).send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
        return res.status(400).send({ status: false, msg: "No such user exists" });

        res.status(200).send({status:true,data:userDetails})
    } catch(error){
    res.send({ status: false, msg:res.message });
     }
};


// 4. API
const updateUser = async function (req, res) {
 try{

    let userId = req.params.userId;
    let user = await userModel.findById(userId);

    if (!user) {
        return res.status(400).send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
    res.status(200).send({ status: updatedUser, data: updatedUser });
}catch(error){
    res.status(500).send({status:false, msg: res.message})
}
};


// 5. API
const deletedUser = async function (req, res) {
    try{
    let userId = req.params.userId;
    let user = await userModel.findById(userId)

    if (!user) {
        return res.status(400).send("no such user exist");
    }
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true });
    res.status(200).send({ status: true, updatedUser })
    if (updatedUser.isDeleted == true) { return res.send("user already deleted") };
} catch{
    res.status(500).send({status:false,msg: res.message})
}

}

// 6. API
const postMessage = async function (req, res) {
    try{
    let message = req.body.message

    let user = await userModel.findById(req.params.userId)
    if (!user) return res.status(400).send({ status: false, msg: 'No such user exists' })

    let updatedPosts = user.posts

    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })


    return res.status(200).send({ status: true, data: updatedUser })
    } catch(error){
        res.status(500).send({status:false, msg: res.message})
    }
}



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deletedUser = deletedUser;
module.exports.postMessage = postMessage;