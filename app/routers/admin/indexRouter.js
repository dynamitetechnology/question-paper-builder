const express = require('express');
const router = express.Router()

const admin = require('../../controllers/admin/indexController')

router.get('/dashboard', admin.dashboard)
router.get('/create-question', admin.getMenuPage)
router.post('/upload-menu', admin.uploadMenu)
module.exports = router;