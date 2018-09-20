"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');

var user = {};
var templateVars = {};

app.use(cookieSession({
  name: 'session',
  keys: ['anks'],
  maxAge: 24 * 60 * 60 * 1000 // Cookie Options, 24 hours
}));
// Seperated Routes for each Resource
//const usersRoutes = require("./routes/users");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
//app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
// Mount all resource routes
//app.use("/api/users", usersRoutes(knex));
// Home page
app.get("/", (req, res) => {
  templateVars = {username: req.session.email};
  res.render("index", templateVars);
});

// Register page
app.get("/register", (req, res) => {
  templateVars = {username: req.session.email};
  res.render("register", templateVars);
});
app.post("/register", (req, res) => {
  knex('users')
    .where({
      email: req.body.email
    })
    .then(function (rows) {
      if (rows.length > 0) {
        res.send('Sorry user already exists with the email: ' + req.body.email)
      } else {
//after validating if the user (email) already doesnt exists, then insert the data into DB
        user = {
          email: req.body.email,
          password: req.body.password,
          user_name: req.body.username
        };
        knex("users")
          .insert(user)
          .then(function () {
            res.redirect("/login");
          })
          .catch(function (error) {
            res.send('Error Occurred, Please check your email and try again later ' + error.message);
          })
      }
    })
    .catch(function (error) {
      console.error(error)
      res.send('Error Occurred ' + error)
    });
})
// Login page
app.get("/login", (req, res) => {
  templateVars = { username: "email" };
  res.render("login", templateVars);
});
app.post("/login", (req, res) => {
//validating if the email already exists in DB
  knex('users')
    .where({
      email: req.body.email
    })
    .then(function (rows) {
      if (rows.length > 0) {
        console.log(JSON.stringify(rows[0]))
        if (req.body.password === rows[0].password) {
          console.log('Password Matches')
          req.session.email = req.body.email; //setting the cookies
          res.redirect('/')
        } else {
          console.log('Password fails')
          res.send('Sorry, Incorrect Password, Please try again!')
        }
      } else {
        res.send('No User Found with the email: ' + req.body.email)
      }
    })
    .catch(function (error) {
      console.error(error)
      res.send('Error Occurred ' + error)
    });
});
app.post("/logout", (req, res) => {
  req.session.email = null;
  res.redirect('/');
})
app.get("/createmaps", (req, res) => {
  res.render("createmaps");
})
app.post("/createmaps", (req, res) => {
console.log(req.body);
  knex("points")
          .insert(req.body)
          .then(function () {
            res.redirect("/login");
          })
          .catch(function (error) {
            res.send('Error Occurred, Please check your email and try again later ' + error.message);
          })
  //req.body.mapname
  //For all Points [Array]
  //Each Latitude, Longitude, Title, Description
  //Insert Maps
  //Insert Points
  // res.send("map submited successfully for " + req.body.mapname);
})
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
