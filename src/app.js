const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const configObject = require("./config/env.config");
require("./config/connect.config");
const { logger } = require("./middlewares/logger.middleware");
const viewsRouter = require("./routes/views.router");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const Socket = require("./socket/socket");

const app = express();
const PORT = configObject.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

const httpServer = app.listen(PORT, () => {
  logger.info(
    `Server connected on port ${PORT} and running on http://localhost:${PORT}`
  );
});

new Socket(httpServer);
