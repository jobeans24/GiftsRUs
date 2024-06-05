
const router = require("express").Router();
const { Gift, Purchased, Event } = require("../models");
const { withAuth } = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: Gift,
          },
        {
          model: Purchased,
        },
      ],
    });

    const events = eventData.map((event) => event.get({ plain: true }));
    console.log(events);

    res.render("dashboard", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", withAuth, async (req, res) => {
  try {
    res.render("newEvent", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Gift,
          attributes: ["name", "price", "store", "category", "image"],
        },
        {
          model: Purchased,
          attributes: ["id", "date", "quantity", "gift_id"],
        },
      ],
    });

    const event = eventData.get({ plain: true });

    res.render("editEvent", {
      ...event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
