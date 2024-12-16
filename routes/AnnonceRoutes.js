const express = require('express');
const { showAnnonce } = require('../controllers/AnnonceControllers');

const router = express.Router();

router.get("/:id", showAnnonce)


module.exports = router;