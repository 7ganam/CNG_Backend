const Car = require('../models/car')
const asyncHandler = require('../utils/async')
var randomstring = require("randomstring");


// @desc      Get cars
// @route     GET /api/v1/cars
// @access   TODO: Private 
exports.getCars = asyncHandler(async (req, res, next) => {
  const cars = await Car.find();
  return res.status(200).json({
    success: true,
    count: cars.length,
    data: cars
  });
});


// @desc      creat a car entry
// @route     POST /api/v1/cars
// @access    TODO: Private
exports.addCar = asyncHandler(async (req, res, next) => {

  // take time zone into considerating in date --- if we save the date directly some times a different day is stored in the db because if time zone differences
  let _date = new Date(req.body.last_maintenance_date)
  let _userOffset = _date.getTimezoneOffset() * 60 * 1000; // user's offset time
  let _centralOffset = 6 * 60 * 60 * 1000; // 6 for central time - use whatever you need
  _date = new Date(_date.getTime() - _userOffset + _centralOffset); // redefine variable
  console.log('date', _date)


  const car = await Car.create({
    plate_no: req.body.plate_no.split(' ').join(''),
    plate_str: req.body.plate_str.split(' ').join(''),
    qr_str: randomstring.generate(32
    ),
    maintenances: [_date]
  });
  res.status(201).json({
    success: true,
    data: car
  });
})


// @desc      get a car by plate number
// @route     GET /api/v1/cars/getcars
// @access   TODO: Private 
exports.getCarByPlate = asyncHandler(async (req, res, next) => {
  let plate_no = req.params.plate_no.split(' ').join('');
  let plate_str = req.params.plate_str.split(' ').join('');
  console.log({ plate_no, plate_str })

  const car = await Car.find({ plate_no: plate_no, plate_str: plate_str });
  console.log(car)
  if (car.length > 0) {
    return res.status(200).json({
      success: true,
      data: car
    });
  }
  else {
    return res.status(404).json({
      success: false,
      data: "not found"
    });

  }

});


// @desc      update a car's latest maintainence date
// @route     GET /api/v1/cars/getcars
// @access   TODO: Private 
exports.updateMaintDate = asyncHandler(async (req, res, next) => {
  let id = req.params.id
  const old_car = await Car.findById(id);
  if (old_car) {
    let new_car = old_car

    // take time zone into considerating in date --- if we save the date directly some times a different day is stored in the db because if time zone differences
    let _date = new Date(req.body.new_maintainance_date)
    let _userOffset = _date.getTimezoneOffset() * 60 * 1000; // user's offset time
    let _centralOffset = 6 * 60 * 60 * 1000; // 6 for central time - use whatever you need
    _date = new Date(_date.getTime() - _userOffset + _centralOffset); // redefine variable


    new_car.maintenances.push(_date)
    const saved_car = await Car.create(new_car)
    return res.json({ saved_car })
  }
  else {
    return res.status(404).json({
      success: false,
      data: "not found"
    });
  }

});