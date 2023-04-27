const express = require('express');
const router = express.Router()

const admin = require('../../controllers/admin/indexController')
const login = require('../../controllers/home/loginController')

router.get('/dashboard', admin.dashboard)
router.get('/create-question', admin.getMenuPage)
router.post('/upload-menu', admin.uploadMenu)
router.get('/create-header', admin.createHeader)

module.exports = router;