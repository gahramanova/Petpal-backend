const { User, registerValidate, loginValidate } = require("../../models/ubwo/user");
const bcrypt = require("bcrypt");
const { auditLogger } = require("../../logger");
const getIp = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress;

exports.userAuth = async (req, res) => {
    const ip = getIp(req);
    const { error } = loginValidate(req.body);

    if (error) {
        auditLogger.warn(`Login failed - validation error: ${error.message} | email: ${req.body.email} | IP: ${ip}`);
        return res.status(400).send(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        auditLogger.warn(`Login failed - user not found | email: ${req.body.email} | IP: ${ip}`);
        return res.status(400).send("You dont have an account!");
    }

    const isSuccess = await bcrypt.compare(req.body.password, user.password);
    if (!isSuccess) {
        auditLogger.warn(`Login failed - wrong password | email: ${req.body.email} | IP: ${ip}`);
        return res.status(403).send("Email or password is wrong!");
    }

    const token = user.createAuthToken();

    auditLogger.info(`Login is succesfull | email: ${req.body.email} | id: ${user._id} | IP: ${ip}`);

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
        return res.status(400).send(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        auditLogger.warn(`Registration is failed - user already exist | email: ${req.body.email} | IP: ${ip}`);
        return res.status(401).send("this user already existed");
    }

    if (req.body.role === "admin") {
        auditLogger.warn(`Registration is failed - user tried to register as admin | email: ${req.body.email} | IP: ${ip}`);
        return res.status(403).send("ERROR! You are doing something you dont have the authority to do!");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    user = new User(req.body);
    user.password = hashPassword;

    const token = user.createAuthToken();
    const result = await user.save();

    auditLogger.info(`New user registered | email: ${req.body.email} | id: ${user._id} | IP: ${ip}`);

    res
        .cookie("petpal", token, {
            httpOnly: true,
            secure: true, // Using HTTPS
            sameSite: "None", // frontend in different domain
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

    res.status(201).header("x-auth-token", token).send(result);
};


exports.userEdit = async (req, res) => {
    const ip = getIp(req);
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
        auditLogger.warn(`User update failed - user not found | id: ${req.params.id} | IP: ${ip}`);
        return res.status(404).send("There is no such data.");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

    if (updatedUser) {
        auditLogger.info(`User updated | id: ${req.params.id} | email: ${updatedUser.email} | IP: ${ip}`);
        res.status(200).json(updatedUser);
    } else {
        auditLogger.warn(`User update failed | id: ${req.params.id} | IP: ${ip}`);
        res.status(500).send("Something went wrong.");
    }
};


exports.userDelete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
}