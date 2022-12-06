var express = require("express");
var router = express.Router();

var {
  getCars,
  addCar,
  getCarByPlate,
  getCarByQr,

  updateMaintDate,
} = require("../controllers/cars");

/* GET  a car by plate number. */
router.get("/getcar", getCarByPlate);
router.get("/getcar/:qr", getCarByQr);
router.get("/getcar/:plate_no/:plate_str", getCarByPlate);

/* GET all cars. */

router.get("/", getCars);

/* CREAT a car entry. */
router.post("/", addCar);

/* Update a car maintainance date. */
router.put("/:id", updateMaintDate);

module.exports = router;
