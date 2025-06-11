const Audit = require("../models/components/audit");

const saveAuditLog = async ({ user, action, resource, resourceId, details }) => {
    try {
        const log = new Audit({
            user,
            action,
            resource,
            resourceId,
            details
        });
        await log.save();
    } catch (error) {
        console.error("Audit log failed to save to DB:", error.message);
    }
};

module.exports = saveAuditLog;
