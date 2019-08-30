const express = require("express");
const app = express();

app.use(express.static("css"));
app.use(express.static("assets"));

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/auth/google", function(req, res, next) {
  console.log("Hey, I am an intermediary on a request to /auth/google");
  next();
});

app.get("/", function(req, res) {
  res.render("first-page");
});

app.get("/auth/google", function(req, res) {
  res.render("auth-google", {
    email: req.query.email,
    password: req.query.password
  });
});

app.get("/logged", function(req, res) {
  res.render("logged");
});

const server = app.listen(3000, "localhost", function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log("The application is listening on http://" + host + ":" + port);
});

app.use(function(req, res, next) {
  res.status(404).send("Sorry, we could not find what You are looking for..!");
  console.log("error 404");
});
