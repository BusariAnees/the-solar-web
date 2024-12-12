const express = require('express');
const Product = require('../models/product-model');


const router  = express.Router();

router.get('/', async function(req, res) {
    res.render('customer/product/solar-main-page');
});

router.get('/401', function(req, res) {
    res.status(401).render('shared/401');
});

router.get('/403', function(req, res) {
    res.status(403).render('shared/403');
});

module.exports = router;