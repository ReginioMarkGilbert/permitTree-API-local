const express = require('express');
const router = express.Router();
const { createApplication, getApplications, updateApplication, deleteApplication, resetCounter, getNotifications, markNotificationAsRead, getTreeData, updateTreeData, createTreeData } = require('../controllers/applicationController');

router.post('/createApplication', createApplication);
router.get('/getApplications', getApplications);
router.put('/updateApplication/:id', updateApplication);
router.delete('/deleteApplication/:id', deleteApplication);
router.post('/resetCounter', resetCounter);

router.get('/getNotifications', getNotifications);
router.put('/markNotificationAsRead/:id/read', markNotificationAsRead);

router.get('/getTreeData', getTreeData);
router.put('/updateTreeData', updateTreeData);
router.post('/addTreeData', createTreeData);

module.exports = router;
