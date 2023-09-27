require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const port = 8085;
const requestLogger = require('./middlewares/request_logger');
const reqBodyMethodOverride = require('./middlewares/method_override');
const database = require('./db/index')

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.set('view engine', 'ejs');  //for ejs

// == middlewares ============================================

app.use(express.static('public')); // for css

app.use(express.urlencoded({ extended: true }))  //for req.body{}

app.use(reqBodyMethodOverride);  // for PUT and DELETE in forms

app.use(requestLogger);  // request Logger

app.use(expressLayouts);  // for Layouts


// == routers ================================================

app.get('/', (req,res) => {
    res.render('landing')
})

app.get('/dashboard', (req, res) => {
    // if not logged in, redirect to login page


    // if logged in, query db where userId

    const sql = `SELECT * FROM destinations;`

    database.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
        }

        let destinations = dbRes.rows;

        res.render('dashboard', { destinations })
    })

})

// add new destination
app.get('/destination/new', (req, res) => {
    res.render('new_form');
})

app.post('/destinations', (req,res) => {
    
    const values = [1, req.body.name, req.body.image, req.body.targetDate, req.body.duration, req.body.partner, req.body.budget, req.body.note]

    const sql = `
        INSERT INTO destinations (userid, name, imageurl, targetVisitDate, duration, travelPartners, budget, note)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `

    database.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/dashboard');
    })

})

// show destination details
app.get('/destinations/:id', (req, res) => {
    
    const values = [req.params.id];

    const sql = `SELECT * FROM destinations WHERE id = $1;`

    database.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err)
        }

        let destination = dbRes.rows[0];

        res.render('show', { destination })
    })

})

// update destination details
app.get('/destinations/:id/edit', (req, res) => {
    const values = [req.params.id];

    const sql = `SELECT * FROM destinations WHERE id = $1;`

    database.query(sql, values, (err, dbRes) => {
        
        let destination = dbRes.rows[0];

        res.render('edit_form', { destination })
    })

})

app.put('/destinations/:id', (req, res) => {
    const values = [req.body.name, req.body.image, req.body.targetDate, req.body.duration, req.body.partner, req.body.budget, req.body.note, req.params.id]

    const sql = `
        UPDATE destinations
        SET name = $1, imageurl = $2, targetVisitDate = $3, duration = $4, travelPartners = $5, budget = $6, note = $7
        WHERE id = $8;
    `

    database.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect(`/destinations/${req.params.id}`);
    })

})

// delete destination
app.delete('/destinations/:id', (req, res) => {
    const values = [req.params.id];

    const sql = `DELETE FROM destinations WHERE id = $1;`

    database.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/dashboard');
    })
})