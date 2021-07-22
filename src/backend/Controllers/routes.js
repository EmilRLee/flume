const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Alert = require('../Models/Alert');
const ProfileImage = require('../Models/ProfileImage');
const Issue = require('../Models/Issue');

/* ALL READ ------------ ALL READS   -------------------- */
//Gets all Users
router.get("/users", async (req,res) => {
    try{
        const users = await User.find()
        res.send(users)
    } catch{
        console.log(err)
    }
    
});
//Get all Alerts
router.get("/alerts", async (req,res) => {
    try{
        const alerts = await Alert.find();
        res.send(alerts)
    } catch{
        console.log(err)
    }
});
//Get User image
router.get("/image/:id", async (req, res) =>{
    try{
        const img = await ProfileImage.findOne({"_id": id});
    } catch{
        console.log(err)
    }
});
//Get all issues
router.get("/issues", async (req,res) => {
    try{
        const issues = await Issue.find()
        res.send(issues)
    } catch{
        console.log(err)
    }
    
});





module.exports = router