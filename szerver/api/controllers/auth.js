var models = require('../models/index')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {User} = models;
const AuthController = {
    login(req, res) {
        let fetchedUser;
        User.findOne({username: req.body.username}).then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign(
                {username: fetchedUser.username, userid: fetchedUser._id},
                "nodewem_lokjcret_nasdopass_sec_-_encryption.urta_fgdjhasdhukk_tta",
                {expiresIn: "1h"}
            );
            res.status(200).json({
                token: token,
                username: fetchedUser.username,
                id: fetchedUser.id,
                expiresIn: 3600
            });
        }).catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Auth failed"
            });
        });
    },
    register(req, res) {
        console.log(req.body);
        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash
            });
            user.save().then(result => {
                res.status(200).json({
                    message: "User create successfull",
                    result: result,
                });

            }).catch(err => {
                res.status(500).json({
                    error: err

                });
                console.log(error);
            });
        });
    }
};
module.exports = AuthController;