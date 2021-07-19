const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.post('/', withAuth, async (req,res) => {
    if(req.session.loggedIn) {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.userId,
        })
        res.json(newComment)
    }   catch (err) {
        res.status(500).json(err)
    }}
    else {
        res.redirect('/login')
    }
})

module.exports = router