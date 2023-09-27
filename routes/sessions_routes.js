const express = require('express');
const database = require('../db/index');
const bcrypt = require('bcrypt');
const router = express.Router();


// login form and checks
router.get('/login', (req, res) => {
    res.render('form_login', { errorMessage: '' })
})

router.post('/login', (req, res) => {

    // find user by email
    const values = [req.body.email];

    const sql =`SELECT * FROM users WHERE email = $1;`

    database.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err);
        }

        // if no matching email, return error message
        if (dbRes.rows.length === 0) {
            return res.render('form_login', { errorMessage: 'Invalid email. Try again.' })
        }

        // if have matching email, check password
        const userInputPw = req.body.password;
        const hashedPwFromDb = dbRes.rows[0].password_digest;

        bcrypt.compare(userInputPw, hashedPwFromDb, (err, result) => {
            if (err) {
                console.log(err);
            }

            if (result) {
                req.session.userId = dbRes.rows[0].userid
                return res.redirect('/dashboard')
            } else {
                return res.render('form_login', {errorMessage: 'Incorrect password. Try again.' })
            }
        })
    })
})

// logout
router.delete('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/')
})

module.exports = router;