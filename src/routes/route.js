const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weatherController = require("../controllers/weathereController")
const memesController = require("../controllers/memesController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

router.get("/cowin/getByDistrict", CowinController.getByDistrictId)


//Assignment 2 - Current Weather API requests

router.get('/currentWeather',weatherController.currentWeather)
router.get('/sortcity-ByTemp',weatherController.sortCityByTemp)

//Assignment 3 - Memes API requests 

router.get('/getAllmemes',memesController.getAllmemes)
router.post('/createMemes',memesController.createMemes)


module.exports = router;