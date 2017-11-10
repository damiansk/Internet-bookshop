const passport = require('passport');
const User = require('../database/models').User;
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

const generateHash = password =>
                    bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

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
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 6});
    const errors = req.validationErrors();
    
    if(errors) {
        const errorsMessages = errors.map(error => error.msg);
        return done(null, false, req.flash('error', errorsMessages));
    }
    
    User.findOne({
        where: { email }
    }).then(user => {
        
        if (user) {
            return done(null, false, {
                message: 'That email is already taken'
            });
        } else {
            User.create({
                email,
                password: generateHash(password),
                idAddressData: 1,
                idInvoiceData: 1,
                idDeliveryData: 1
            }).then((newUser, created) => {
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
