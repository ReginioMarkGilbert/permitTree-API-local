const express = require('express');
const router = express.Router();
const { createApplication, getApplications, updateApplication, deleteApplication, resetCounter } = require('../controllers/applicationController');

router.post('/createApplication', createApplication);
router.get('/getApplications', getApplications);
router.put('/updateApplication/:id', updateApplication);
router.delete('/deleteApplication/:id', deleteApplication);
router.post('/resetCounter', resetCounter);

module.exports = router;