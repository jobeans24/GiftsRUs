const router = require("express").Router();
const userRoutes = require("./userRoutes");
const giftRoutes = require("./giftRoutes");
const purchaseRoutes = require("./purchaseRoutes");
const eventRoutes = require("./eventRoutes");

router.use("/users", userRoutes);
router.use("/gifts", giftRoutes);
router.use("/purchases", purchaseRoutes);
router.use("/events", eventRoutes);

module.exports = router;
