const router = require('express').Router();
const { Registry } = require('../../models');

// GET all registries
router.get('/', async (req, res) => {
    try {
        const registryData = await Registry.findAll();
        res.status(200).json(registryData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// GET a single registry
router.get('/:id', async (req, res) => {
    try {
        const registryData = await Registry.findByPk(req.params.id);
        if (!registryData) {
            res.status(404).json({ message: 'No registry found with that id!' });
            return;
        }
        res.status(200).json(registryData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// CREATE a registry
router.post('/', async (req, res) => {
    try {
        const registryData = await Registry.create(req.body);
        res.status(200).json(registryData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// UPDATE a registry
router.put('/:id', async (req, res) => {
    try {
        const registryData = await Registry.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!registryData[0]) {
            res.status(404).json({ message: 'No registry found with that id!' });
            return;
        }
        res.status(200).json(registryData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

// DELETE a registry
router.delete('/:id', async (req, res) => {
    try {
        const registryData = await Registry.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!registryData) {
            res.status(404).json({ message: 'No registry found with that id!' });
            return;
        }
        res.status(200).json(registryData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;