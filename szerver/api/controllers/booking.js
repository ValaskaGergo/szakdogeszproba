var models = require('../models/index')

const {Booking, FreeDay} = models;
const bookingController = {
    all(req, res) {
        // Returns all Slots
        Booking.find({})
            .exec((err, bookings) => res.json(bookings))
    },
    save(req, res) {
        var requestBody = req.body;

        var freeday = FreeDay.find({day: requestBody.day}).then(resp => {
            if (resp.length > 0) {
                res.status(200).json({
                    code: 1,
                    message: "Its a freeday"
                });
            } else {
                var booking = Booking.find({day: requestBody.day, time: requestBody.time}).then(resp => {
                    console.log(booking);
                    if (resp.length > 0) {
                        res.status(200).json({
                            code: 2,
                            message: "Already booked"
                        });
                    } else {
                        var newBooking = new Booking({
                            name: requestBody.name,
                            day: requestBody.day,
                            time: requestBody.time,
                            service_name: requestBody.service_name,
                            phone: requestBody.phone,
                            email: requestBody.email,
                            length: requestBody.length,
                            status: 'booked',
                        });

                        newBooking.save().then(result => {
                            res.status(200).json({
                                message: "Booking create successfull",
                                result: result,
                            });
                        });
                    }
                })

            }
        })
    },
    resolve(req, res) {
        console.log(req.body);
        Booking.remove({_id: req.body.id}).then(result => {
            res.status(200).json({
                message: "Booking delete successfull",
                result: result,
            });
        });
    }
};
module.exports = bookingController;