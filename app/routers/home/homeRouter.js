const express = require('express');
const router = express.Router()

const index = require('../../controllers/home/homeController')
const login = require('../../controllers/home/loginController')
router.get('/', index.indexPage)
router.get('/signin', index.loginPage)
router.get('/signup', index.register)
router.get('/menu', index.menu)
router.get('/blog', index.blog)
router.get('/event', index.event)
router.get('/reservation', index.reservation)
router.post('/signup', login.register)
module.exports = router;