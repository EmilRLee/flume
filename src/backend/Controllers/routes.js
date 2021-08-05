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
const Event = require('../Models/Event');
const Message = require('../Models/Message')

/* ALL READ ------------ ALL READS   -------------------- */


//Gets all Users
router.get("/users", async (req,res) => {
    try{
        const users = await User.find()
        res.send(users)
    } catch{
        console.log("users error")
    }
    
});
//Get one user by Email
router.get("/user/:email", async (req,res) => {
    try{
        const user = await User.findOne({"email": req.params.email})
        res.send(user)
    } catch{
        console.log("user retrieval error")
    }
    
});
//Get all Alerts
router.get("/alerts", async (req,res) => {
    try{
        const alerts = await Alert.find();
        res.send(alerts)
    } catch{
        console.log("alerts error")
    }
    
});
//Get User image
router.get("/image/:id", async (req, res) =>{
    try{
        const img = await ProfileImage.findOne({"_id": req.params.id});
    } catch{
        console.log("image error")
    }
});
//Get all issues
router.get("/issues", async (req,res) => {
    try{
        const issues = await Issue.find()
        res.send(issues)
    } catch{
        console.log("issues error")
    }

});
//Get messages for the specified room
router.get("/messages/:room", async (req,res) => {
    try{
        const messages = await Message.find({"room": req.params.room})
        res.send(messages)
        console.log(messages)
    } catch{
        console.log("messages error")
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

router.get('/getCustomers/:org', async (req, res) => {
    const org = Organization.findOne({"name": req.params.org}, "customers", (error, customers) => {
        console.log(customers)
        res.send(customers)
    });
    

});

router.get('/getEvents/:org', async (req, res) => {
    const events = Event.find({"org": req.params.org}, "title start end customer", (error, events) => {
        console.log(events)
        res.send(events)
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

router.get('/createIssue/:title/:description/:status/:customer/:assignee', async (req, res) => {
    console.log("Creating New Issue");
    console.log(req.params);
    const issue = new Issue(req.params);
    await issue.save();
    res.sendStatus(200);
});

router.get('/createEvent/:title/:start/:end/:org/:cus', async (req, res) => {
    console.log("Creating New Event");
    console.log(req.params);
    const event = new Event(req.params);
    await event.save();
    res.sendStatus(200);
});

module.exports = router