const express = require('express');
const database = require('../db/index');  
const router = express.Router(); 

router.get('/', (req,res) => {
    res.render('landing')
})

router.get('/dashboard', (req, res) => {
    
    if (req.session.userId){

        const values = [req.session.userId];
        const sql = `
            SELECT * FROM destinations WHERE userid = $1;
        `    
        database.query(sql, values, (err, dbRes) => {
            if (err) {
                console.log(err);
            }
            
            let destinations = dbRes.rows;
            
            res.render('dashboard', { destinations })
        })
    } else { 
        return res.redirect('/login')
    }
})

module.exports = router;