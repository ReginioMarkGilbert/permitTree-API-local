const express = require('express');
const router = express.Router();
const { createApplication, getApplications, updateApplication, deleteApplication } = require('../controllers/applicationController');

router.post('/createApplication', createApplication);
router.get('/getApplications', getApplications);
router.put('/updateApplication/:id', updateApplication);
router.delete('/deleteApplication/:id', deleteApplication);

module.exports = router;