require('dotenv').config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


// import seeds file
const seedDatabase = require("./seeds/seed");


const app = express();
const PORT = process.env.PORT || 3001;

const SESSION_SECRET = process.env.SESS_SECRET || "Super secret secret";

const hbs = exphbs.create({ helpers });

const sess = {
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// start the server after determine to execute seeding first
const startServer = () => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
};

// Sync Sequelize and start server with or without seeding
const initializeServer = async () => {
  try {
    if (process.env.RUN_SEEDS === "true") {
      console.log("Running seeds...");
      await seedDatabase();
      console.log("Seeding completed!");
    }
    await sequelize.sync({ force: false });
    startServer();
  } catch (err) {
    console.error("Error during initialization:", err);
    process.exit(1); // Exit the process with failure
  }
};

initializeServer();
