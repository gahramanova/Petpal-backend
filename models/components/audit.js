const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    user: {
        type: String,
        required: false,
    },
    action: {
        type: String, 
        required: true,
    },
    resource: {
        type: String, 
    },
    resourceId: {
        type: String, 
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: Object, 
    }
});

module.exports = mongoose.model("Audit", auditSchema);
