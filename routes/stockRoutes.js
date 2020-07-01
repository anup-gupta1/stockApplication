const express = require('express');
const stockController = require('../controllers/stockController');
const router = express.Router();
const passport = require('passport');

router.get('/', stockController.getCompaniesStock);

module.exports = router;
