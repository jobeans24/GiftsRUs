
const router = require("express").Router();
const { User, Gift, Purchased, Event } = require("../models");
const { withAuth, withoutAuth } = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: Gift,
          attributes: ["name", "price", "website"],
        },
        {
          model: Purchased,
          attributes: ["id", "date", "userId", "gift_ids"],
        },
      ],
    });


    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("home", {
      events,
      //logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error("Error fetching events:", err);
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

// login
router.get("/login", withoutAuth, (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});


// sign up
router.get("/signup", withoutAuth, (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
