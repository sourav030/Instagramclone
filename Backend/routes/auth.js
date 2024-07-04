const express = require('express')
const User = require('../model/model')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const requireLogin = require('../middlewares/requireLogin');
const Post = require('../model/post')
const Jwt_secret="fhdksoleigma"

router.get('/', (req, res) => {
    res.send("hello world")
})
router.use(require("./createpost"))

router.post('/signup', (req, res) => {

    const { name, username, email, password } = req.body;
    if (!username || !password || !name || !email) {
       return res.status(404).json({ message: "Something went wrong" })
    }
    bcrypt.hash(password, 12).then((hashedPassword) => {
        User.findOne({ $or:[{email:email},{username:username}] }).then((saveUser) => {
            if (saveUser) {
                res.status(404).json({error : "user already exist" })
            }
            const newUser = new User({ name, username, email, password:hashedPassword})
            newUser.save()
                .then((user) => {
                    res.status(201).json({ message: "user created" })
                })
                .catch((error) => {
                    res.status(500).json({ error: "error creating user" })
                })
        })
    })
   
})



router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
        // res.status(200).json({ message: "User signed in successfully" });
        else if (isMatch) {
            const token=jwt.sign({_id:user.id},Jwt_secret)
            const _id=user.id;
            console.log(_id)
        res.status(200).json({ message: "User signed in successfully",token,_id});
        }

    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
});

module.exports = router;