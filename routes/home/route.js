"use strict";

const express = require("express");
const router = express.Router();
const control = require("./controller");

router.get("/", control.home);
router.get("/login", control.login);

router.get("/create", (req, res) => {
   res.render("home/create");
})
router.get("/create/write", (req, res) => {
    res.render("home/create-write");
})

module.exports = router;