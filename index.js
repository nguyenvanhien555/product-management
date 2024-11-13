const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const port = process.env.PORT;
const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
const systemConfig = require("./config/system");

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash())

// App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listen on port ${port}`); 
});