const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//Homepage with all post, loggedin or loggedout
router.get('/', async (req, res) => {
    try{
        //TODO: check if we need to add a where claus
        const postData = await Post.findAll();

        const postsFormatted = postData.map((post) => post.get({plain: true}));

        res.render('homepage', postsFormatted);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/signUp', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } else {
        res.render('signUp');
    }
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } else {
        res.render('login');
    }
})

module.exports = router;