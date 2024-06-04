const router = require('express').Router();
const { Purchased } = require('../../models');

// GET all purchases
router.get('/', async (req, res) => {
    try {
        const purchaseData = await Purchased.findAll();
        res.status(200).json(purchaseData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// GET a single purchase
router.get('/:id', async (req, res) => {
    try {
        const purchaseData = await Purchased.findByPk(req.params.id);
        if (!purchaseData) {
            res.status(404).json({ message: 'No purchase found with that id!' });
            return;
        }
        res.status(200).json(purchaseData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// CREATE a purchase
router.post('/', async (req, res) => {
    try {
        const purchaseData = await Purchased.create(req.body);
        res.status(200).json(purchaseData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// UPDATE a purchase
router.put('/:id', async (req, res) => {
    try {
        const purchaseData = await Purchased.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!purchaseData[0]) {
            res.status(404).json({ message: 'No purchase found with that id!' });
            return;
        }
        res.status(200).json(purchaseData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// DELETE a purchase
router.delete('/:id', async (req, res) => {
    try {
        const purchaseData = await Purchased.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!purchaseData) {
            res.status(404).json({ message: 'No purchase found with that id!' });
            return;
        }
        res.status(200).json(purchaseData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;