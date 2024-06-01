const Application = require('../models/Application');
const Counter = require('../models/Counter');

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
        const customId = `PMDQ-CSAW-${date}-${String(counter.seq).padStart(6, '0')}`;

        const newApplication = new Application({
            customId, name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput, fileNames, store
        });
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (err) {
        console.error('Error:', err); // Log the error
        res.status(400).json({ error: err.message });
    }
};

const getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
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

module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
};

