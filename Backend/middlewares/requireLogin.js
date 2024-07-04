

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/model');
const jwt_secret = "fhdksoleigma";

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwt_secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { _id } = payload;
        User.findById(_id).then(userdata => {
            if (!userdata) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.user=userdata
            console.log(userdata);
            next();
        }).catch(err => {
            return res.status(500).json({ error: "Internal server error" });
        });
    });
};