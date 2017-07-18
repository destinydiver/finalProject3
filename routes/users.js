const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Part = require('../models/part');

// Register New User
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User Registered'});
        }
    });
});

// Creating a Part
router.post('/dashboard', (req, res, next) => {
    let newPart = new Part({
        vehicle: req.body.vehicle,
        partDescription: req.body.partDescription,
        forTrade: req.body.forTrade,
        forSale: req.body.forSale
    });

    Part.addPart(newPart, (err, part) => {
        if(err) {
            res.json({success: false, msg:'Failed to create new part'});
        } else {
            res.json({success: true, msg: 'Part created'});
        }
    });
});

// Editing Part 
router.put('/dashboard/:id', function(req, res){
    let id = req.params.id;
    let part = req.body;
    console.log(id);
    
    if(part && part._id !== id) {
        return res.status(500).json({err: "Ids don't match!"})
    }

    Part.findByIdAndUpdate(id, part, {new: true}, function(err, part){
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({'part': part, message: 'Part updated!'});
    })
});

// Deleting a Part
router.delete('/dashboard/:id', function(req, res){
    let id = req.params.id;
    let part = req.body;

    if(err) { 
        return res.status(500).json({err: err.message});
    }
    Part.findOneAndRemove(id, function(err, part){
        if(err) {
            return res.status(500).json({err: err.message});           
        }
        res.json({'part': part, message: 'Part deleted!'});
        res.this.router.navigate(['dashboard']);
    })
        
});


// Authenticate User
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found.'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});


// Get Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// Get Parts
router.get('/dashboard', function(req, res) {
    Part.find({}, function(err, parts) {
        if(err) {
            return res.status(500).json({message: err.message});
        }
        res.json({parts: parts});
        const myParts = parts;
        
    });
});


module.exports = router;