const router = require('express').Router();
const { User } = require('../../models');

router.post('/create', async (req, res) => {
    try {
        // Trys to create a new user
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        })

        // Sets the session data
        req.session.save(() => {
            req.session.userId = newUser.id,
            req.session.username = newUser.username,
            req.session.loggedIn = true

            res.json(newUser)
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        //  Checks to see if this user exists
        const user = await User.findOne({
            where: {
                username: req.session.username
            }
        })

        if (!user) {
            res.status(400).json({ message: 'No user found' })
            return;
        }

        //  Checks for the correct password 
        const passwordValidate = user.checkPassword(req.body.password)

        if (!passwordValidate) {
            res.status(400).json({ message: 'Password not found' })
            return;
        }

        // Sets the session data
        req.session.save(() => {
            req.session.userId = user.id
            req.session.username = user.username
            req.session.loggedIn = true

            res.json({ user, message: 'You are logged in' })
        })
    } catch {
        res.status(400).json({ message: 'No user found' })
    }
})

// Handles logout
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router;