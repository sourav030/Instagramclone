const express = require('express')
const Post = require('../model/post')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = require('../model/model')


// Hume user kr profile ko darsana hai isly hum user and post dono ko return kr rhe hai
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)

        .select('-password')// jo chiz nhi chahiye usko htane ke liye use krenge
       
        .then((user) => {
            Post.find({ postedBy: req.params.id }) // hum post ko find kr rhe hai userid se to sirf Post.find use krenge
                .populate('postedBy', 'name')
                .populate('comments.postedBy', 'name')
                .then((post) => {
                    res.json({ user, post })
                })
                .catch((err) => res.status(500).json(err))
        })
        .catch((err) => res.status(500).json(err))
})

// To follow the User


router.put("/follow", requireLogin, async (req, res) => {
    try {
        // Update the user being followed (add current user to their followers list)
        const updatedFollowedUser = await User.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );

        // Update the current user (add the followed user to their following list)
        const updatedCurrentUser = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { folllowing: req.body.followId } },
            { new: true }
        );

        // Respond with the updated current user
        res.json(updatedCurrentUser);
    } catch (err) {
        console.error(err);
        res.status(422).json({ error: err.message });
    }
});



router.put("/uploadProfilePic", requireLogin, async (req, res) => {
    try {
        const u = await User.findByIdAndUpdate(req.user._id, {
            $set: { Photo: req.body.photo },
        }, {
            new: true
        }
        )
        return res.json (u)
    }
    catch (err) {
        console.error(err);
        res.status(422).json({ error: err.message });
    }
   
})


router.put("/unfollow", requireLogin, async (req, res) => {
    try {
        // Update the user being followed (add current user to their followers list)
        const updatedFollowedUser = await User.findByIdAndUpdate(
            req.body.followId,
            { $pull: { followers: req.user._id } },
            { new: true }
        );

        // Update the current user (add the followed user to their following list)
        const updatedCurrentUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { folllowing: req.body.followId } },
            { new: true }
        );

        // Respond with the updated current user
        res.json(updatedCurrentUser);
    } catch (err) {
        console.error(err);
        res.status(422).json({ error: err.message });
    }
});

module.exports = router