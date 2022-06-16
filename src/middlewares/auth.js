const jwt = require("jsonwebtoken");



const mid1 = async function (req, res, next) {


    let token = req.headers["x-auth-token"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

    console.log("token");

    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
        return res.status(401).send({ status: false, msg: "token is invalid" });

    next()

}


// authorizationj==================================
const authorize = async function (req, res, next) {
    let token = req.headers["x-auth-token"]
    if (!token) return res.status(400).send({ status: false, msg: "token must be present in the request header" })
    let decodedToken = jwt.verify(token, 'functionup-radon')

    if (!decodedToken) return res.status(403).send({ status: false, msg: "token is not valid" })

    let userToBeModified = req.params.userId
    let userLoggedIn = decodedToken.userId

    if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    next()
}

module.exports.mid1 = mid1
module.exports.authorize = authorize