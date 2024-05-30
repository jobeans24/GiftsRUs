const router = require('express').Router();
const { Gift } = require('../../models');

// GET all gifts
router.get('/', async (req, res) => {
    try {
        const giftData = await Gift.findAll();
        res.status(200).json(giftData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// GET a single gift
router.get('/:id', async (req, res) => {
    try {
        const giftData = await Gift.findByPk(req.params.id);
        if (!giftData) {
            res.status(404).json({ message: 'No gift found with that id!' });
            return;
        }
        res.status(200).json(giftData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// CREATE a gift
router.post('/', async (req, res) => {
    try {
        const giftData = await Gift.create(req.body);
        res.status(200).json(giftData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// UPDATE a gift
router.put('/:id', async (req, res) => {
    try {
        const giftData = await Gift.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!giftData[0]) {
            res.status(404).json({ message: 'No gift found with that id!' });
            return;
        }
        res.status(200).json(giftData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// DELETE a gift
router.delete('/:id', async (req, res) => {
    try {
        const giftData = await Gift.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!giftData) {
            res.status(404).json({ message: 'No gift found with that id!' });
            return;
        }
        res.status(200).json(giftData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;