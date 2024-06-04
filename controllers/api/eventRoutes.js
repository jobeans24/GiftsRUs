const router = require("express").Router();
const { Event } = require("../../models");

// GET all events
router.get("/", async (req, res) => {
  try {
    const eventData = await Event.findAll();
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single event
router.get("/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);
    if (!eventData) {
      res.status(404).json({ message: "No event found with that id!" });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an event
router.post("/", async (req, res) => {
  try {
    const eventData = await Event.create(req.body);
    res.status(200).json(eventData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE an event
router.put("/:id", async (req, res) => {
  try {
    const eventData = await Event.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!eventData[0]) {
      res.status(404).json({ message: "No event found with that id!" });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an event
router.delete("/:id", async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!eventData) {
      res.status(404).json({ message: "No event found with that id!" });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
