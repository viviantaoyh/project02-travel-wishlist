const express = require('express');
const database = require('../db/index');
const bcrypt = require('bcrypt');
const router = express.Router();

// sign up
router.get('/users/new', (req, res) => {
    res.render('form_signup')
})

router.post('/users/new', (req, res) => {

    const fullName = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const saltRounds = 10;

    const sql = `
    INSERT INTO users (fullName, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *;
`

// 1. generate some salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
    
    // 2. hash the password
        bcrypt.hash(password, salt, function(err, hash) {
        
        // 3. insert user & hashed password into database
            database.query(sql, [fullName, email, hash], (err, dbRes) => {
                if (err) {
                console.log(err);
                }
                req.session.userId = dbRes.rows[0].userid;
                return res.redirect('/dashboard')
        })
    });
});
})

module.exports = router;