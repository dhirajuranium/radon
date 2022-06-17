let axios = require('axios')

const currentWeather = async function (req, res) {
    try {
        let city = req.query.q
        let appid = req.query.appid

        let option = {
            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
        }
        let result = await axios(option)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}

const sortCityByTemp = async function(req,res){
    try{
        let myCities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let myTemps = []
        let result = 0
        for (let i=0; i<myCities.length; i++) {
            let city = myCities[i]
            let appid = req.query.appid

            let option = {
                method: 'get',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`

            }
            result = await axios(option)
            let myResult = result.data
            myTemps.push({temp:myResult.main.temp, city: myResult.name})
            myTemps.sort(function(a,b){
                if(a.temp<b.temp) return -1;
                if(a.temp>b.temp) return 1;
                return 0;
            })
        }
        console.log(myTemps)
        res.status(200).send({msg:result.data})
    } catch(error) {
        console.log(err)
        res.status(500).send({msg:error.message})
    }
}


module.exports.currentWeather=currentWeather
module.exports.sortCityByTemp=sortCityByTemp