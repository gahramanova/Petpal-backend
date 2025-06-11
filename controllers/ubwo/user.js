const { User, registerValidate, loginValidate } = require("../../models/ubwo/user");
const bcrypt = require("bcrypt");
const { auditLogger } = require("../../logger");
const getIp = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress;
const saveAuditLog = require("../../utils/auditToDb");


exports.userAuth = async (req, res) => {
    const ip = getIp(req);
    const { error } = loginValidate(req.body);

    if (error) {
        auditLogger.warn(`Login failed - validation error: ${error.message} | email: ${req.body.email} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: req.body.email,
            action: "Login failed - validation error",
            resource: "User",
            details: { email: req.body.email, ip, reason: error.message }
        });

        return res.status(400).send(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        auditLogger.warn(`Login failed - user not found | email: ${req.body.email} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: req.body.email,
            action: "Login failed - user not found",
            resource: "User",
            details: { email: req.body.email, ip }
        });

        return res.status(400).send("You dont have an account!");
    }

    const isSuccess = await bcrypt.compare(req.body.password, user.password);
    if (!isSuccess) {
        auditLogger.warn(`Login failed - wrong password | email: ${req.body.email} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: req.body.email,
            action: "Login failed - wrong password",
            resource: "User",
            resourceId: user._id,
            details: { ip }
        });

        return res.status(403).send("Email or password is wrong!");
    }

    const token = user.createAuthToken();

    auditLogger.info(`Login is successful | email: ${req.body.email} | id: ${user._id} | IP: ${ip}`);

    // 🔸 Audit to MongoDB
    await saveAuditLog({
        user: req.body.email,
        action: "Login successful",
        resource: "User",
        resourceId: user._id,
        details: { ip }
    });

    res.header("x-auth-token", token).send(token);
};


exports.singleUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
};



exports.userList = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
}

exports.userAdd = async (req, res) => {
    const ip = getIp(req);
    const { error } = registerValidate(req.body);

    if (error) {
        auditLogger.warn(`Registration is failed - validation error: ${error.message} | email: ${req.body.email} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: req.body.email,
            action: "Registration failed - validation error",
            resource: "User",
            details: { email: req.body.email, ip, reason: error.message }
        });

        return res.status(400).send(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        auditLogger.warn(`Registration is failed - user already exist | email: ${req.body.email} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: req.body.email,
            action: "Registration failed - user already exists",
            resource: "User",
            details: { email: req.body.email, ip }
        });

        return res.status(401).send("this user already existed");
    }

    if (req.body.role === "admin") {
        auditLogger.warn(`Registration is failed - user tried to register as admin | email: ${req.body.email} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: req.body.email,
            action: "Registration failed - tried to register as admin",
            resource: "User",
            details: { email: req.body.email, ip }
        });

        return res.status(403).send("ERROR! You are doing something you dont have the authority to do!");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    user = new User(req.body);
    user.password = hashPassword;

    const token = user.createAuthToken();
    const result = await user.save();

    auditLogger.info(`New user registered | email: ${req.body.email} | id: ${user._id} | IP: ${ip}`);

    // 🔸 Audit to MongoDB
    await saveAuditLog({
        user: req.body.email,
        action: "Registration successful",
        resource: "User",
        resourceId: user._id,
        details: { ip }
    });

    res
        .cookie("petpal", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        });

    res.status(201).header("x-auth-token", token).send(result);
};


exports.userEdit = async (req, res) => {
    const ip = getIp(req);
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
        auditLogger.warn(`User update failed - user not found | id: ${req.params.id} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: "unknown",
            action: "User update failed - user not found",
            resource: "User",
            resourceId: req.params.id,
            details: { ip }
        });

        return res.status(404).send("There is no such data.");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

    if (updatedUser) {
        auditLogger.info(`User updated | id: ${req.params.id} | email: ${updatedUser.email} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: updatedUser.email,
            action: "User updated",
            resource: "User",
            resourceId: updatedUser._id,
            details: { ip, updatedFields: req.body }
        });

        res.status(200).json(updatedUser);
    } else {
        auditLogger.warn(`User update failed | id: ${req.params.id} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: existingUser.email || "unknown",
            action: "User update failed",
            resource: "User",
            resourceId: req.params.id,
            details: { ip }
        });

        res.status(500).send("Something went wrong.");
    }
};


exports.userDelete = async (req, res) => {
    const ip = getIp(req);
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        auditLogger.warn(`User deletion failed - user not found | id: ${req.params.id} | IP: ${ip}`);

        // 🔸 Audit to MongoDB
        await saveAuditLog({
            user: "unknown",
            action: "User deletion failed - user not found",
            resource: "User",
            resourceId: req.params.id,
            details: { ip }
        });

        return res.status(404).json({ message: "User not found" });
    }

    auditLogger.info(`User deleted | id: ${req.params.id} | email: ${user.email} | IP: ${ip}`);

    // 🔸 Audit to MongoDB
    await saveAuditLog({
        user: user.email,
        action: "User deleted",
        resource: "User",
        resourceId: user._id,
        details: { ip }
    });

    res.status(200).send(user);
};