var models = require('../models/index')

const {FreeDay} = models;
const freeDayController = {
    all(req, res) {
        // Returns all Slots
        FreeDay.find({})
            .exec((err, freeDays) => res.json(freeDays))
    },
    save(req, res) {
        console.log(req.body);
        var requestBody = req.body;
        var newFreeDay = new FreeDay({
            day: requestBody.day
        });
        newFreeDay.save().then(result => {
            res.status(200).json({
                message: "FreeDay create successfull",
                result: result,
            });
        });
    },
    delete(req, res) {
        console.log(req.body);
        FreeDay.deleteOne({_id: req.body.id}).then(result => {
            res.status(200).json({
                message: "FreeDay delete successfull",
                result: result,
            });
        })
    }
};
module.exports = freeDayController;