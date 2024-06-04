const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET a single user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        console.log(userData);
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// CREATE a user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        //save session data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.userName = userData.userName;
            req.session.logged_in = true;
        });

        res.status(200).json(userData);


    } catch (err) {
        res.status(400).json(err);
    }
}
);

// UPDATE a user
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }
        res.status(200).json(userData);

        // destory session
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// process login 
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.body.userName
            },
        });

        if (!userData) {
            res.status(400).json({message: 'Incorrect user name or password - please try again!'})
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: 'Incorrect user name or password - please try again!'})
            return;            
        }

        console.log('Save session data');
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.userName = userData.userName;
            req.session.logged_in = true;
            
            res.status(200).json({
                userData,
                message: 'You are logged in!',
            });
        });
    } catch(err) {
        res.status(400).json(err);
    }

});

// logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;