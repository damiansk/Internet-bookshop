const passport = require('passport');
const User = require('../database/models').User;
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const AddressData = require('../database/models').AddressData;

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
    req.checkBody('firstName', 'Invalid name').notEmpty();
    req.checkBody('surname', 'Invalid surname').notEmpty();
    req.checkBody('phoneNumber', 'Invalid phone number').isMobilePhone('any');
    req.checkBody('street', 'Invalid street').notEmpty();
    req.checkBody('houseNumber', 'Invalid house number').notEmpty();
    req.checkBody('postalCode', 'Invalid postal code').isPostalCode('any');
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
            var firstNameText = req.body.firstName;
            var surnameText = req.body.surname;
            var nipNumberText = req.body.nipNumber;
            var phoneNumberText = req.body.phoneNumber;
            var streetText = req.body.street;
            var houseNumberText = req.body.houseNumber;
            var apartmentNumberText = req.body.apartmentNumber;
            var postalCodeText = req.body.postalCode;
            var cityText = req.body.city;

            if(req.checkBody('nipNumber').isEmpty()){
                nipNumberText = null;
            }
            if(req.checkBody('apartmentNumber').isEmpty()){
                apartmentNumberText = null;
            }
            AddressData.create({
                name: 'name',
                fisrtName: firstNameText,
                surname: surnameText,
                nipNumber: nipNumberText,
                phoneNumber: phoneNumberText,
                street: streetText,
                houseNumber: houseNumberText,
                apartmentNumber: apartmentNumberText,
                postalCode: postalCodeText,
                city: cityText
            }).then((newAddressData) => {
                User.create({
                email,
                password: generateHash(password),
                //TODO create empty address for new users or update signup form with new fields for address
                idAddressData: newAddressData.getDataValue('idAddressData'),
                idInvoiceData: newAddressData.getDataValue('idAddressData'),
                idDeliveryData: newAddressData.getDataValue('idAddressData')
            }).then((newUser) => {
                return newUser ?
                    done(null, newUser) :
                    done(null, false);
});
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