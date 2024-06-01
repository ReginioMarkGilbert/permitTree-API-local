const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    customId: { type: String, unique: true },
    store: { type: mongoose.Schema.Types.Mixed, required: true },
    // Owner details
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    fileNames: { type: [String], default: [] },
    // chainsaw details
    brand: { type: mongoose.Schema.Types.Mixed, required: true },
    model: { type: mongoose.Schema.Types.Mixed, required: true },
    serialNumber: { type: mongoose.Schema.Types.Mixed, required: true },
    dateOfAcquisition: { type: Date, required: true },
    powerOutput: { type: mongoose.Schema.Types.Mixed, required: true },

    status: { type: String, default: 'For Review' }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
