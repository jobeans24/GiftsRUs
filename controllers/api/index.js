const router = require('express').Router();
const userRoutes = require('./userRoutes');
const giftRoutes = require('./giftRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const registryRoutes = require('./registryRoutes');

router.use('/users', userRoutes);
router.use('/gifts', giftRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/registries', registryRoutes);

module.exports = router;