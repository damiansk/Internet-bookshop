const passport = require('passport');
const User = require('../database/models').User;
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    User.findOne({where: { email }})
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    
    User.findOne({
        where: { email }
    }).then(user => {
        
        if (user) {
            return done(null, false, {
                message: 'That email is already taken'
            });
        } else {
            const data = {
                email,
                password: generateHash(password),
                idAddressData: 1,
                idInvoiceData: 1,
                idDeliveryData: 1
            };
            // {
            //     email: email,
            //
            //     password: userPassword,
            //
            //     firstname: req.body.firstname,
            //
            //     lastname: req.body.lastname
            //
            // };
            
            User.create(data).then((newUser, created) => {
                if (!newUser) {
                    return done(null, false);
                }
                
                if (newUser) {
                    return done(null, newUser);
                }
                
            });
        }
        
    });
}));


// passport.use('local-signup', new LocalStrategy(
//     {
//
//         usernameField: 'email',
//
//         passwordField: 'password',
//
//         passReqToCallback: true // allows us to pass back the entire request to the callback
//
//     },
    //
    //
    // function (req, email, password, done) {
    //
    //     const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    //
    //     User.findOne({
    //         where: { email }
    //     }).then(user => {
    //
    //         if (user) {
    //             return done(null, false, {
    //                 message: 'That email is already taken'
    //             });
    //         } else {
    //             const data = {
    //                 email,
    //                 password: generateHash(password),
    //                 idAddressData: 1,
    //                 idInvoiceData: 1,
    //                 idDeliveryData: 1
    //             };
    //             // {
    //             //     email: email,
    //             //
    //             //     password: userPassword,
    //             //
    //             //     firstname: req.body.firstname,
    //             //
    //             //     lastname: req.body.lastname
    //             //
    //             // };
    //
    //             User.create(data).then((newUser, created) => {
    //                 if (!newUser) {
    //                     return done(null, false);
    //                 }
    //
    //                 if (newUser) {
    //                     return done(null, newUser);
    //                 }
    //
    //             });
    //         }
    //
    //     });
    //
    // }
// ));