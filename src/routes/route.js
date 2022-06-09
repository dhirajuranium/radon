const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/authorController')
const BookController = require('../controllers/bookController')
const PublisherConroller = require('../controllers/publisherController')


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", AuthorController.createAuthor  )

router.post("/createPublisher", PublisherConroller.createPublisher)

router.post("/createBook",BookController.createBook )

router.get("/getAll-books", BookController.fetchBook)

router.put("/updateBooks",BookController.updateBooks)


module.exports = router;