const express = require('express');

const router = express.Router();

router.use('/', (req, res) => res.send('create OK'));

module.exports = router;
