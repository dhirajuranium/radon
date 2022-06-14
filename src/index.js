const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const Auth = require("../Middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",Auth.authMiddleware, userController.getUserData)

router.put("/users/:userId",Auth.authMiddleware, userController.updateUser)

router.delete("/delet-users/:userId",Auth.authMiddleware, userController.deleteUser)

module.exports = router;