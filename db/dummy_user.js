require('dotenv').config();

const bcrypt = require('bcrypt');
const database = require('./index');

// User Details
const fullName = 'test user'
const email = 'testing@ga.co'
const password = 'testing'
const saltRounds = 10;

// Define SQL command
const sql = `
    INSERT INTO users (fullName, email, password_digest)
    VALUES ($1, $2, $3);
`

// 1. generate some salt
bcrypt.genSalt(saltRounds, function(err, salt) {
    
    // 2. hash the password
    bcrypt.hash(password, salt, function(err, hash) {
        
        // 3. insert user & hashed password into database
        database.query(sql, [fullName, email, hash], (err, dbRes) => {
            if (err) {
                console.log(err);
            } else {
                console.log('user created')
            }
        })
    });
});