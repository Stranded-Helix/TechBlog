const router = require('express').Router()
const withAuth = require('../utils/auth')
const { Post } = require('../models')

// Get all posts the user created
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId
            }
        })
        const posts = postData.map((post) => post.get({plain: true}));
        res.render('userPost', {layout: 'dashboard', posts, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.redirect('/')
    }
})

// new post
router.get('/new-post', withAuth, async (req,res) => {
    res.render('newPost', { layout: 'dashboard', loggedIn: true })
})

// edit post
router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        if (postData) {
            const post = postData.get({ plain: true })
            res.render('editPost', { layout: 'dashboard', post, loggedIn: true });
        } else {
            res.status(404).end()
        }
    }   catch {
        res.redirect('login')
    }
})
module.exports = router;