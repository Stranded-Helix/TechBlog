const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');

// Allows user to create a post
router.post('/', withAuth, async (req, res) => {
    const body = req.body

    try {
        const newPost = await Post.create({ ...body, userId: req.session.userId, loggedIn: true})
        res.json(newPost)

    }   catch (err) {
        res.status(500).json(err)
    }
})

// Handles specific posts
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        if (affectedRows < 0){
            res.status(200).end()
        } else {
            res.status(404).end()
        }
    }   catch (err) {
        res.status(500).json(err)
    }
})
 
// Handles deleting a post by a user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = Post.destroy({
            where: {
                id: req.params.id
            }
        })

        if (affectedRows > 0){
            res.status(200).end()
        } else {
            res.status(404).end()
        }
    }   catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router