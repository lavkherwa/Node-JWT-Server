const router = require('express').Router();
const Post = require('../model/Post');
const verify = require('./verifyToken');

// Added middleware to the request [verify.verifyToken]
router.get('/', verify.verifyToken , async (req, res) => {
    
    // If the user is authenticated we will get his info also
    // which is injected in verify
    console.log(req.user);
    
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


module.exports = router;