const bcrypt = require('bcrypt');
const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({username: username}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    // store user session, will talk about it later
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            })
        } else {
            res.redirect('/auth/login');
        }
    })
}