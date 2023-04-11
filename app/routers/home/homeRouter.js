const express = require('express');
const router = express.Router()

const index = require('../../controllers/home/homeController')

router.get('/', index.indexPage)
router.get('/login', index.loginPage)
router.get('/register', index.register)
router.get('/menu', index.menu)
router.get('/blog', index.blog)
router.get('/event', index.event)
router.get('/reservation', index.reservation)
module.exports = router;