const express = require("express");
const helmet = require("helmet");
const server = express();
const projectRouter = require("./routers/project");
const actionRouter = require("./routers/action");

server.use(helmet());

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>This is a cool API</h2>`);
});
function logger(req, res, next) {
  console.log(
    `[${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}] ${
      req.method
    } to ${req.url}`
  );
  next();
}

module.exports = server;
