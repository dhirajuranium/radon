let axios = require('axios')

const getAllmemes = async function(req,res){
    
        let option = {
            method: 'get',
            url: `https://api.imgflip.com/get_memes`
        }
        let response = await axios(option);

        res.status(200).send({status:true , data:response.data})
    

}

const createMemes = async function(req,res){
    let id = req.query.template_id
    let text0 = req.query.text0
    let text1 = req.query.text1
    let username = req.query.username
    let password = req.query.password

    let option = {
        method: 'post',
        url: `https://api.imgflip.com/caption_image? template_id=${id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
    }
    let response= await axios(option)

    res.status(200).send({status:true, data:response.data})
}

module.exports.getAllmemes=getAllmemes
module.exports.createMemes=createMemes