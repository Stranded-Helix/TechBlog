const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.post('/', withAuth, async (req,res) => {
    try {
        const newCommnet = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        })
        res.json(newCommnet)
    }   catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router