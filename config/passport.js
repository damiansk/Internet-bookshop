const passport = require('passport');
const User = require('../database/models').User;
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

const generateHash = password =>
                    bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

const validPassword = (password, userPassword) =>
                    bCrypt.compareSync(password, userPassword);

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
                //TODO create empty address for new users or update signup form with new fields for address
                idAddressData: 1,
                idInvoiceData: 1,
                idDeliveryData: 1
            }).then((newUser) => {
                return newUser ?
                    done(null, newUser) :
                    done(null, false);
            });
        }
    }).catch(err => done(null, false, {
        message: 'Something went wrong'
    }));
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    req.checkBody('email', 'Invalid email').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    const errors = req.validationErrors();
    
    if(errors) {
        const errorsMessages = errors.map(error => error.msg);
        return done(null, false, req.flash('error', errorsMessages));
    }
    
    User.findOne({
        where: { email }
    }).then(user => {
        if(!user || !validPassword(password, user.password)) {
            return done(null, false, {
                message: 'Wrong email or password'
            });
        } else {
            return done(null, user);
        }
    }).catch(err => {
        console.log(err);
        done(null, false, {
            message: 'Something went wrong'
        })
    })
}));