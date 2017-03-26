var express = require('express');
var router = express.Router();
var usersController = require('../controllers/user.controller.js')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var passport = require('passport');

router.post('/', usersController.register);
router.post('/login', usersController.login);
router.get('/', usersController.getAllUsers);
router.delete('/:id', usersController.deleteUser);
router.get('/findByEmail/:email', usersController.findByEmail);
router.get('/:id', usersController.findById);
router.post('/update', usersController.update);
router.post('/profile/editPhoto', multipartMiddleware, usersController.editPhoto);


module.exports = router;



// router.get('/facebookLogin', usersController.facebookLogin)

//Facebook Authentication
// router.get('/facebook', passport.authenticate('facebook', {
//     failureRedirect: '/'
// }));
//
// router.get('/facebook/callback', passport.authenticate('facebook', {
//     failureRedirect: '/',
//     successRedirect: '/'
// }));

// router.get('/facebook/callback',
//     passport.authenticate('facebook',  {failureRedirect : '/'}),
//
//     // on succes
//     function(req,res) {
//         // return the token or you would wish otherwise give eg. a succes message
//         res.json({data: JSON.stringify(req.user)});
//     },
//
//     // on error; likely to be something FacebookTokenError token invalid or already used token,
//     // these errors occur when the user logs in twice with the same token
//     function(err,req,res,next) {
//         // You could put your own behavior in here, fx: you could force auth again...
//         // res.redirect('/auth/facebook/');
//         if(err) {
//             res.status(400);
//             res.json({message: err.message});
//         }
//     }
// );
