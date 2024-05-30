const router = require('express').Router();
const { Gift, Purchase, Registry } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const registryData = await Registry.findAll({
        include: [
            {
            model: Gift,
            attributes: ['name', 'price', 'store', 'category', 'image'],
            },
            {
            model: Purchase,
            attributes: ['id', 'date', 'quantity', 'gift_id'],
            },
        ],
        });
    
        const registries = registryData.map((registry) =>
        registry.get({ plain: true })
        );
    
        res.render('dashboard', {
        registries,
        logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('newRegistry', {
        logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const registryData = await Registry.findByPk(req.params.id, {
        include: [
            {
            model: Gift,
            attributes: ['name', 'price', 'store', 'category', 'image'],
            },
            {
            model: Purchase,
            attributes: ['id', 'date', 'quantity', 'gift_id'],
            },
        ],
        });
    
        const registry = registryData.get({ plain: true });
    
        res.render('editRegistry', {
        ...registry,
        logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;