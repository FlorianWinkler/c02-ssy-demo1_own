const express = require("express");
const router = express.Router();
const database = require("../src/database");

const userCollection = database.getCollection("users");


router.get("/", getLegsStats);
router.get("/:color", getLegStatsByColor);

function getLegsStats(req,res){
    let result = {
        users: userCollection.find().length,
        sum_legs: calcLegsSum(userCollection.find()),
        avg_legs: calcLegsAvg(userCollection.find())
    };
    res.json(result);
}

function getLegStatsByColor(req,res) {
    let queryColor=req.params.color;
    let result ={
        users: userCollection.where(isColor).length,
        sum_legs: calcLegsSum(userCollection.where(isColor)),
        avg_legs: calcLegsAvg(userCollection.where(isColor))
    }
    res.json(result);

    function isColor(obj){
        if (obj.color == queryColor){
            return true;
        }
        return false;
    }
}


function calcLegsSum(users){
    let result=0;
    for(let u of users){
        console.log("Legs: "+u.legs);
        result+=parseInt(u.legs);
        console.log("new Sum: "+result);
    }
    console.log("sum:"+result);
    return result;
}

function calcLegsAvg(users) {
    console.log("Avg: "+calcLegsSum(users)/users.length);
    return calcLegsSum(users)/users.length;
}



module.exports = router;