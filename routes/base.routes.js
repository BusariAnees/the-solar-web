const express = require('express');



const router  = express.Router();

router.get('/', function(req, res) {
    res.render('customer/product/solar-main-page');
});


module.exports = router;