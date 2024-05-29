const mongoose = require('mongoose');
const moment = require('moment'); // Add this line to use moment for date formatting

const applicationSchema = new mongoose.Schema({
    // _id: { type: String, required: true }, // Change this line to make _id of type String
    // Owner details
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'For Review' },
    // chainsaw details
    brand: { type: mongoose.Schema.Types.Mixed, required: true },
    model: { type: mongoose.Schema.Types.Mixed, required: true },
    serialNumber: { type: mongoose.Schema.Types.Mixed, required: true },
    dateOfAcquisition: { type: Date, required: true },
    powerOutput: { type: mongoose.Schema.Types.Mixed, required: true }
    // fileNames: { type: [String], default: [] },

});

// applicationSchema.pre('save', function(next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }
//     this._id = `PMDQ-CSAW-${moment().format('YYYY')}-${moment().format('MMDD')}-${Math.random().toString().slice(2,8)}`; // Custom ID generation logic
//     next();
// });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
