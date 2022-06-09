const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const PublisherModel = require('../models/publisherModel')

const createBook = async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher
    //  a)
    if (!authorId) {
        return res.send({ msg: "Author id must be present in book deteails" })
    }

    // b)
    let author = await authorModel.findById(authorId)
    if (!author) {
        return res.send({ msg: "No valid author id" })
    }

    // c)
    if (!publisherId) {
        return res.send({ msg: "Publisher id must be present in book deteails " })
    }
    // d)
    let publisher = await PublisherModel.findById(publisherId)
    if (!publisher) {
        return res.send({ msg: "No valid publisher id" })
    }

    let bookCreated = await bookModel.create(book)
    res.send({ data: bookCreated })

}

const fetchBook = async function (req, res) {
    let book = await bookModel.find().populate('author publisher')
    res.send({ data: book })
}

const updateBooks = async function (req,res) {
    let hardCover = await PublisherModel.find({name:{$in:['Penguin', 'HarperCollins']}}).select({_id:1})
  let arrayOfPublisher = []

  for (let i = 0;i < hardCover.length;i++) {
      let objId = hardCover[i]._id
      arrayOfPublisher.push(objId)
  }
let books = await bookModel.updateMany({publisher:{$in: arrayOfPublisher}},{isHardCover:true})
res.send({data:books})

}


module.exports.createBook = createBook
module.exports.fetchBook = fetchBook
module.exports.updateBooks = updateBooks