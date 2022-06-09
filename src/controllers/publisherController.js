const PublisherModel=require('../models/publisherModel')


const createPublisher = async function(req,res){
    let data = req.body
    let savedData = await PublisherModel.create(data)
    res.send({msg:savedData})
} 

module.exports.createPublisher=createPublisher