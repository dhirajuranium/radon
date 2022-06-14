const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// 1. API
const createUser = async function (req, res) {

  let data = req.body;
  let savedData = await userModel.create(data);
  // console.log(abcd.newAtribute);
  res.send({ msg: savedData });
};


// 2. API
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
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
  res.send({ status: true, token: token });
};



// 3.API
const getUserData = async function (req, res) {

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};


// 4. API
const updateUser = async function (req, res) {
  let userId = req.params.userId
  let user = await userModel.findById(userId)

  if (!user) {
    return res.send("No such user exist")
  }

  let userData = req.body
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: userData },
    { new: true },
  )
  res.send({ status: true, data: updatedUser })
}


// 5. API
const deleteUser = async function(req,res){
  let userId = req.params.userId
  let user = await userModel.findOneAndUpdate(
    {_id:userId},
    {$set:{isDeleted:true}},
    {new:true}
  )

  res.send({status:true, data:user});
}




module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
