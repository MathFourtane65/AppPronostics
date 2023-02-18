var User = require('../models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(user);
        });
    });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user  = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ 'msg': 'The user does not exist' });
    }
    if(user.password !== password) {
        return res.status(400).json({ 'msg': 'The password is incorrect' });
    }
    return res.status(200).json({ user, });
};

// exports.loginUser = (req, res) => {
//     if (!req.body.email || !req.body.password) {
//         return res.status(400).send({ 'msg': 'You need to send email and password' });
//     }

//     User.findOne({ email: req.body.email }, (err, user) => {
//         if (err) {
//             return res.status(400).send({ 'msg': err });
//         }

//         if (!user) {
//             return res.status(400).json({ 'msg': 'The user does not exist' });
//         }
//         else {
//             return res.status(200).json({
//                 token: createToken(user),
//                 user: user
//             });
//         }
//     });
//     //     user.comparePassword(req.body.password, (err, isMatch) => {
//     //         if (isMatch && !err) {
//     //             return res.status(200).json({
//     //                 token: createToken(user)
//     //             });
//     //         } else {
//     //             return res.status(400).json({ msg: "The email and password don't match." });
//     //         }
//     //     });
//     // });
// };