const router = require('express').Router();
const { Cart, Product } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all cart items
router.get('/', withAuth, async (req, res) => {
    try {
        const cartData = await Cart.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: Product,
                    attributes: ['name', 'price', 'category', 'image'],
                },
            ],
        });

        const carts = cartData.map((cart) => cart.get({ plain: true }));

        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET a single cart item
router.post('/', withAuth, async (req, res) => {
    try {
        const newCart = await Cart.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newCart);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

// DELETE a cart item
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const cartData = await Cart.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!cartData) {
            res.status(404).json({ message: 'No cart found with this id!' });
            return;
        }

        res.status(200).json(cartData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;