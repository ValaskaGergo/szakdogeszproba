var models = require('../models/index')

const {Service} = models;
const serviceController = {
    all(req, res) {
        // Returns all Slots
        Service.find({})
            .exec((err, services) => res.json(services))
    },
    save(req, res) {
        var requestBody = req.body;
        var newService = new Service({
            name: requestBody.name,
            length: requestBody.length,
            created_at: Date.now()
        });
        newService.save().then(result => {
            res.status(200).json({
                message: "Service create successfull",
                result: result,
            });
        });
    },
    delete(req, res) {
        console.log(req.body);
        Service.deleteOne({_id: req.body.id}).then(result => {
            res.status(200).json({
                message: "Service delete successfull",
                result: result,
            });
        })
    }
};
module.exports = serviceController;