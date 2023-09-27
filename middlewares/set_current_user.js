const database = require('../db/index');

function setCurrentUser(req, res, next) {

    // make userId available to all EJS
    res.locals.userId = req.session.userId;

    // if not logged in, move to the next station
    if (!req.session.userId) {
        return next ()
    }

    // if logged in, extract user details from db and make them global.
    const values = [req.session.userId];
    const sql = `SELECT * FROM users WHERE userid = $1;`

    database.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err)
            process.exit(1)
        } else {
            const user = dbRes.rows[0];
            res.locals.user = user;
        }
        next()
    })  
}

module.exports = setCurrentUser;