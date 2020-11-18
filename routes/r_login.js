
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {  
    try{
        res.status(200).render('posts/r_login', {title: "Become a receiever"})
    }
    catch(e){
        res.status(404).render('custom_errors/error', {title: "Not found", errorReason: "Sorry, We can't find the link"})
    }
});

module.exports = router; 