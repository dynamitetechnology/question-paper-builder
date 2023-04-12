const express = require('express');
const router = express.Router()

const admin = require('../../controllers/admin/indexController')
const login = require('../../controllers/admin/loginController')

router.get('/dashboard', admin.dashboard)
router.get('/create-question', admin.getMenuPage)
router.post('/upload-menu', admin.uploadMenu)
router.post('/login', login.login)
module.exports = router;