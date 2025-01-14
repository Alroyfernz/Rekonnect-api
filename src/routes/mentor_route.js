const router = require("express").Router();
let { urlCons } = require("../config/function");
let mentor_controller = require("../controllers/mentor_controller");

router.post(urlCons.URL_MENTOR_REGISTRATION, mentor_controller.registerMentor);
router.get(urlCons.URL_MENTOR_FETCH, mentor_controller.fetchMentor);
//
router.post(urlCons.URL_MENTOR_BOOKING_ADD, mentor_controller.addBooking);
module.exports = router;
