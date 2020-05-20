const express = require('express');
const { getHello, getHelloAdv } = require('../controllers');

const router = express.Router();

router.get('/', getHello);
router.get('/advanced/:id', getHelloAdv);

module.exports = router;