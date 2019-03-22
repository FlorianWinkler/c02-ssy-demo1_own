const express = require("express");
const router = express.Router();
const database = require("../src/database");
const User = require("../src/User");

const userCollection = database.getCollection("users");

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.get("/:id/friends", getFriends);
router.post("/:id/friends", addFriend);

function getUsers(req, res){
    let users = userCollection.find();
    let result=[];

    for(let u of users){
        if(filterUser(req,u)) {
            result.push(new User(u.name, u.legs, u.color, u.friends));
        }
    }
    res.status(200);
    res.json(result);

    function filterUser(req,u) {
        let result=true;
        if("minLegs" in req.query){
            result=filterUserByLegNumber(req,u);
        }
        if("color" in req.query && result!=false){
            result=filterUserByColor(req,u);
        }
        return result;
    }
    function filterUserByLegNumber(req,u){
        if(u.legs >= req.query.minLegs) {
            return true;
        }
        else {
            return false;
        }
    }
    function filterUserByColor(req,u){
        if(u.color == req.query.color) {
            return true;
        }
        else {
            return false;
        }
    }
}

function getUser(req, res){
    user = userCollection.get(req.params.id);
    res.status(200);
    res.json(user);
}

function deleteUser(req,res) {
    userCollection.remove(userCollection.get(req.params.id));
    res.status(200).end();
}

function createUser(req,res){
    let user = new User(req.body.name,req.body.legs);
    userCollection.insert(user);
    res.status(200).end();
}

function updateUser(req,res){
    let user = userCollection.get(req.params.id);
    if(user == null){
        res.status(400).end();
    }
    else{
        if("name" in req.body){
            user.name=req.body.name;
        }
        if("legs" in req.body){
            user.legs=req.body.legs;
        }
        if("color" in req.body){
            user.color=req.body.color;
        }
        userCollection.update(user);
        res.status(200).end();
    }
}

function addFriend(req,res){
    userCollection.get(req.params.id).friends.push(req.body.name);
    console.log(userCollection.get(req.params.id).friends);
    res.status(200).end();
}

function getFriends(req,res){
    res.json(userCollection.get(req.params.id).friends);
}


module.exports = router;