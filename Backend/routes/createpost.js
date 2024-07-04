const express = require('express')
const Post = require('../model/post')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

router.get("/allposts", requireLogin, (req, res) => {
  Post.find().populate("postedBy", "_id name")
    .populate("comments.postedBy", " name")
    .then((post) => {
      return res.json(post);
    })
    .catch((error) => {
      console.log(error);
    })
})

router.post('/createPost', requireLogin, (req, res) => {
  const { photo, body, } = req.body;
  if (!photo || !body) {
    return res.status(404).json({ error: "please add all field" })
  }
  req.user
  const post = new Post({
    photo: photo,
    body: body,
    postedBy: req.user
  })
  post.save().then((result) => {
    return res.json(result)
  })
})

router.get("/myposts", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", " name")
    .then((mypost) => {
      return res.json(mypost);
    })
})


router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("postedBy", " name")

    .then(post => {
      return res.json(post);
    })
    .catch(err => {
      return res.json(err);
    });
});


router.put("/like", requireLogin, async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.body.postId, {
      $push: { likes: req.user._id }
    }, {
      new: true
    }).populate("postedBy", "_id name")
    res.json(result);
  } catch (err) {
    return res.status(422).json({ error: err });
  }
});

router.put("/unlike", requireLogin, async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }
    }, {
      new: true
    }).populate("postedBy", "_id name")
    res.json(result);
  } catch (err) {
    return res.status(422).json({ error: err });
  }
});



router.delete("/deletePost/:postId", requireLogin, async (req, res) => {
  // Retrieve postId from URL params
  const postId = req.params.postId;

  // Use findByIdAndDelete to delete the post by postId
  Post.findByIdAndDelete(postId)
    .then(result => {
      console.log(result);  // Log the result before returning response
      return res.json(result);  // Send JSON response with the result
    })
    .catch(err => {
      console.log(err);  // Log the error before returning error response
      return res.status(422).json({ error: err });  // Send error response
    });
});




module.exports = router;