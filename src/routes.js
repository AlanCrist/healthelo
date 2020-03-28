const express = require("express");

const HospitalController = require("./controllers/HospitalController");

const connection = require("./database/connection");

const routes = express.Router();

routes.get("/hospitais", HospitalController.index);

routes.post("/hospitais", HospitalController.create);

module.exports = routes;
