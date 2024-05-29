const Application = require('../models/Application');

const createApplication = async (req, res) => {
    try {
        const { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput } = req.body;

        // Generate custom ID
        const count = await Application.countDocuments() + 1;
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const customId = `PMDQ-CSAW-${date}-${String(count).padStart(6, '0')}`;

        const newApplication = new Application({ 
            customId, name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput 
        });
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (err) {
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
        const { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput, status } = req.body;
        const updatedApplication = await Application.findByIdAndUpdate(id, { name, address, phone, brand, model, serialNumber, dateOfAcquisition, powerOutput, status }, { new: true });
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

