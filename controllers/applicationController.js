const Application = require('../models/Application');
const Counter = require('../models/counter');
const Notification = require('../models/Notification');
const TreeData = require('../models/TreeData');

const createApplication = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request body
        const { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput, fileNames, store } = req.body;

        // Generate custom ID
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const counter = await Counter.findOneAndUpdate(
            { name: 'applicationId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const year = new Date().getFullYear();
        const customId = `PMDQ-CSAW-${year}-${String(counter.seq).padStart(6, '0')}`;

        const dateOfSubmission = new Date();
        const newApplication = new Application({
            customId, name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput, fileNames, store, dateOfSubmission
        });
        const savedApplication = await newApplication.save();

        const notification = new Notification({
            message: 'Your application was successfully submitted.'
        });
        await notification.save();
        console.log('Notification created:', notification); // Log the notification

        res.status(201).json(savedApplication);
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ error: err.message });
    }
};

const getApplications = async (req, res) => {
    try {
        const { sort } = req.query;
        let sortOption = {};

        if (sort === 'date-asc') {
            sortOption = { dateOfSubmission: 1 };
        } else if (sort === 'date-desc') {
            sortOption = { dateOfSubmission: -1 };
        }

        const applications = await Application.find().sort(sortOption);
        res.status(200).json(applications);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput, status, fileNames, store } = req.body;
        const updatedApplication = await Application.findByIdAndUpdate(id, { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput, status, fileNames, store }, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        const notification = new Notification({
            message: `Your application status was updated to ${updatedApplication.status}.`
        });
        await notification.save();
        // console.log('Notification created:', notification); // Log the notification

        res.status(200).json(updatedApplication);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedApplication = await Application.findByIdAndDelete(id);
        if (!deletedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const resetCounter = async (req, res) => { // endpoint: http://localhost:5000/api/reset-counter
    try {
        const counter = await Counter.findOneAndUpdate(
            { name: 'applicationId' },
            { seq: 0 },
            { new: true }
        );
        res.status(200).json({ message: 'Counter reset successfully', counter });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ read: false });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getTreeData = async (req, res) => {
    try {
        const { timeFrame } = req.query;
        let match = {};

        if (timeFrame === 'day') {
            match = { date: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } };
        } else if (timeFrame === 'week') {
            match = { date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } };
        } else if (timeFrame === 'month') {
            match = { date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } };
        } else if (timeFrame === 'year') {
            match = { date: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) } };
        }

        const treeData = await TreeData.find(match).sort({ date: 1 });
        res.status(200).json(treeData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateTreeData = async (req, res) => {
    try {
        const { date, count } = req.body;
        const updatedTreeData = await TreeData.findOneAndUpdate(
            { date: new Date(date) },
            { count },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedTreeData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createTreeData = async (req, res) => {
    try {
        const { date, count } = req.body;
        const newTreeData = new TreeData({ date, count });
        await newTreeData.save();
        res.status(201).json(newTreeData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
    resetCounter,
    getNotifications,
    markNotificationAsRead,
    getTreeData,
    updateTreeData,
    createTreeData
};
