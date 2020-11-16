const express = require('express')
const router = express.Router();


router.get('/', async (req, res) => { 
    try{
       
        res.status(200).render('posts/form', {title: "Register now or Sign In"})
    }
    catch(e){
        res.status(404).send(e)
        
    }
});

module.exports = router;