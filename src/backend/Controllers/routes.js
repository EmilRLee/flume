const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Alert = require('../Models/Alert');
const ProfileImage = require('../Models/ProfileImage');
const Issue = require('../Models/Issue');
const Bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const Organization = require('../Models/Organization');

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
router.get("/user/:email", async (req,res) => {
    try{
        const user = await User.findOne({"email": req.params.email})
        res.send(user)
    } catch{
        console.log("oops")
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

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/login/:email/:password', urlencodedParser, async (req, res) => {
    console.log({
        data: req.params
    });
    try{
        const validUser = await User.findOne({"email": req.params.email})
        if(validUser){
            console.log("Valid User");
            if(!Bcrypt.compareSync(req.params.password, validUser.password)) {
                console.log("invalid Password");
                return res.send({ 
                    message: "The password is invalid",
                    isvalid: false
                });
            } else {
                res.send({
                    email: req.params.email,
                    isvalid: true
                })
            }
        } else {
            res.send({
                message: "email is invalid",
                isvalid: false
            });
        }
    } catch{
        console.log("something went wrong again")
    }

});

router.get('/getAssignees/:org', async (req, res) => {
    const org = Organization.findOne({"name": req.params.org}, "users", (error, assignees) => {
        console.log(assignees)
        res.send(assignees)
    });
    

});

// ------- CREATE ACTIONS ------------  

router.post('/register', async (req, res) => {
    console.log(req.body);
    try{
        const validUser = await User.findOne({"email": req.body.email})
        if(validUser){
            console.log("Valid User");
            res.send(`There is a user with the email ${req.body.email} already registered.`);
        } else {
            console.log("Registering User Now");
            console.log(req.body);
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            const user = new User(req.body);
            await user.save();
            res.send("Registration Successfull");
        }
    } catch{
        console.log("something went wrong");
    }

});

router.get('/createIssue', async (req, res) => {
    console.log("Creating New Issue");
    console.log(req.body);
    const issue = new Issue(req.body);
    await issue.save();
});


module.exports = router