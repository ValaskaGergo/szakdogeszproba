var models = require('../models/index')

const {Appointment, Slot} = models;
const appointmentController = {
    all(req, res) {
        // Returns all appointments
        Appointment.find({}).exec((err, appointments) => res.json(appointments));
    },
    find(req, res) {
        // Returns all appointments
        console.log(req.body)
        Appointment.find({day_of_week: req.body.day_of_week, length : req.body.length}).exec((err, appointments) => res.json(appointments));
    },
    create(req, res) {
        const requestBody = req.body;
        Appointment.remove({}, () => {
            requestBody.forEach(obj => {
             const newAppointment = new Appointment({
                 day_of_week: obj.day_of_week,
                 start_date: obj.start_date,
                 length: obj.length
             });
             newAppointment.save();
            }, (result) => {
                res.status(200).json({
                    message: "Appointments saved",
                    result: result
                })
            });
        })
    },
};

module.exports = appointmentController;