const express = require('express');
// const myHelper = require('../util/helper')
const underscore = require('underscore');
const { query } = require('express');

const router = express.Router();

// router.get('/test-me', function (req, res) {
//     myHelper.printDate()
//     myHelper.getCurrentMonth()
//     myHelper.getCohortData()
//     let firstElement = underscore.first(['Sabiha', 'Akash', 'Pritesh'])
//     console.log('The first element received from underscope function is ' + firstElement)
//     res.send('My first ever api!')
// });
// ==================================================================================================================================================
// PROBLEM 4 YEASTERDAY ASSINGMENTS 01/06/22

// router.get('/hello', function (req, res) {

//     // PROBLEM A
//     let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//     let subArrays = underscore.chunk(months, 3)
//     console.log("The spliting of these arrays is :", subArrays)

//     // PROBLEM B 
//     let oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
//     console.log("The last 9 oddnumber in the array are", underscore.tail(oddNumbers))

//     //PROBLEM C
//     let a = [1, 2, 1, 4]
//     let b = [2, 3, 4, 3]
//     let c = [6,1, 1]
//     let e = [1,  1, 5, 10]
//     let d = [1, 2, 3, 4, 5]
//     console.log("final array number or union is :",underscore.union(a, b, c, d, e))

//     //PROBLEM D
//     let arrayOfvalueKeypairs = [["horror", "The Shining"], ["rama", "Titanic"], ["thriller", "Shutter Island"], ["fantasy", "Pans Labyrinth"]]
//     console.log("The object created from arrays is:", underscore.fromPadirs(arrayOfvalueKeypairs))

//     res.send('Hello there!')
// })
// ==================================================================================================================================================
//================================================= ASSINGMENTS 02/06/2022 && DAY 13 && GET API ===================================================

// // // PROBLEM 1)

// router.get('/movies', function (req, res) {
//     const array1 = ["spiderman", "superman", "batman", "deadpool", "Avengers end game"]
//     console.log(array1)

//     res.send(array1)
// })

// // PROBLEM 2) & 3)

// router.get('/movies/indexNumber', function (req, res) {
//     let moviesName = ["Rang de basanti", "The shining", "Lord of the rings", " Batman begins","kgf","RRR"]
//     let index= req.params.indexNumber

//     // let moviesName
//     if(index<moviesName.length){
//         movie=moviesName[index];
//     }else{
//         movie=("use valid index")
//     }

    
// })



// // PROBLEM 4)

// router.get('/films', function (req, res) {
//     const arr = [
//         {
//             "id": 1,
//             "name": "The Shining"
//         }, {
//             "id": 2,
//             "name": "Incendies"
//         }, {
//             "id": 3,
//             "name": "Rang de Basanti"
//         }, {
//             "id": 4,
//             "name": "Finding Nemo"
//         }
//     ]
//     console.log(arr)
//     req.send(arr)

// })


















// ===========================================================SABHIHA MAAM TEACHING CODE 02/06/2022 DAY 13==========================================
// router.get('/candidates', function (req, res) {
//     console.log('Query paramters for this request are ' + JSON.stringify(req.query))
//     let gender = req.query.gender
//     let state = req.query.state
//     let district = req.query.district
//     console.log('State is ' + state)
//     console.log('Gender is ' + gender)
//     console.log('District is ' + district)
//     let candidates = ['Akash', 'Suman']
//     res.send(candidates)
// })

// router.get('/candidates/:canidatesName', function (req, res) {
//     console.log('The request objects is ' + JSON.stringify(req.params))
//     console.log('Candidates name is ' + req.params.canidatesName)
//     res.send('Done')
//     })
// =================================================================================================================================================

// ASSINGMENT 03/06/22 DAY 15 

// router.post('/test-post-2',function (req,res){
//     let data = req.body
//     console.log(data)
//     req.res({msg: "hi guys my 2 post req"})
// })

let Names =  [
    {
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },
]

router.post('/players',function(req,res){
    let i=0;
    let myName=req.body;
    for(i;i<Names.length;i++)
    {
        if(myName.name==Names[i].name)
        {
            res.send({r:"player already exist"});
            break;

        }
    }
  console.log(i)
  console.log(Names.length)
  if(i==Names.length)
  {
      Names.push(req.body);
      res.send({data:Names,status:true})
  }
  res.send({data:Names, status: true});

});








module.exports = router;
// adding this comment for no reason