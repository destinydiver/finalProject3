// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const config = require('../config/database');
// const Part = require('../models/part');

// // Creating a Part
// router.post('/dashboard', (req, res, next) => {
//     let newPart = new Part({
//         vehicle: req.body.vehicle,
//         partDescription: req.body.partDescription,
//         forTrade: req.body.forTrade,
//         forSale: req.body.forSale
//     });

//     User.addUser(newUser, (err, user) => {
//         if(err) {
//             res.json({success: false, msg:'Failed to register user'});
//         } else {
//             res.json({success: true, msg: 'User Registered'});
//         }
//     });
// });