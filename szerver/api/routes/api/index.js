var express = require('express');

const router = express.Router();
const appointmentController = require('../../controllers/appointments');
const slotController = require('../../controllers/slot');
const AuthController = require('../../controllers/auth');
const ServiceController = require('../../controllers/service');
const BookingController = require('../../controllers/booking');
const FreeDayController = require('../../controllers/free-day');

router.get('/appointments', appointmentController.all);
router.post('/save-appointments', appointmentController.create);
router.post('/find-appointment', appointmentController.find);
router.get('/retrieveSlots', slotController.all);
router.post('/appointmentCreate', appointmentController.create);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/save-service', ServiceController.save);
router.get('/services', ServiceController.all);
router.post('/delete-service', ServiceController.delete);
router.get('/bookings', BookingController.all);
router.post('/new-booking', BookingController.save);
router.post('/resolve-booking', BookingController.resolve);
router.get('/free-days', FreeDayController.all);
router.post('/save-free-day', FreeDayController.save);
router.post('/delete-free-day', FreeDayController.delete);

module.exports = router;