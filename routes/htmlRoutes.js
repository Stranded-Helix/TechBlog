const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//Homepage with all post, loggedin or loggedout
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({include: User});

        const posts = postData.map((post) => post.get({plain: true}));
        console.log(posts[0]);
        res.render('homepage', {layout: 'main', posts, loggedIn: req.session.loggedIn});
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

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User
            ]
        });

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: User
        })
        console.log(postData);
        console.log(commentData);
        if (postData) {
            const post = postData.get({plain: true})
            const comments = commentData ? commentData.map(x => x.get({plain: true})) : [];

            res.render('viewPost', {post, comments, loggedIn: req.session.loggedIn});
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;