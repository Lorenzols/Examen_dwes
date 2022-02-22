const passport = require('passport');
const LocalStrategy = require('passport-local')

const Users = require('../models/users')

passport.use('local.signup', new LocalStrategy({ 
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true
}, async(req, email, password, done) => { 

    const user = await new Users(req.body) 
    user.id = user.insertId 
    await user.save() 
    done(null, user) 
}))


passport.use('local.signin', new LocalStrategy({ 
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true
}, async(req, email, password, done) => { 

    const user = await Users.findOne({email: email, password: password})

    done(null, user) 
}))

passport.serializeUser(( user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const user = await Users.findById(id)
    done(null, user)
})