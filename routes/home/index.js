const express = require('express');
const router = express.Router();


router.all('/*' ,(req, res, next) =>{
    req.app.locals.layout = 'home';
    next();
})






module.exports = router;