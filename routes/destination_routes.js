const express = require('express');
const database = require('../db/index');
const router = express.Router();


// add new destination
router.get('/new', (req, res) => {
        res.render('form_new');
})

router.post('/', (req,res) => {

        const values = [req.session.userId, req.body.name, req.body.image, req.body.targetDate, req.body.duration, req.body.partner, req.body.budget, req.body.note]
    
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
router.get('/:id', (req, res) => {
    
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
router.get('/:id/edit', (req, res) => {
    const values = [req.params.id];

    const sql = `SELECT * FROM destinations WHERE id = $1;`

    database.query(sql, values, (err, dbRes) => {
        
        let destination = dbRes.rows[0];

        res.render('form_edit', { destination })
    })

})

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const values = [req.params.id];

    const sql = `DELETE FROM destinations WHERE id = $1;`

    database.query(sql, values, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/dashboard');
    })
})

module.exports = router;