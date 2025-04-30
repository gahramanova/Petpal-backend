const { User, registerValidate, loginValidate } = require("../../models/ubwo/user");
const bcrypt = require("bcrypt");

exports.userAuth = async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("You dont have an account!");
        } else {
            const isSuccess = await bcrypt.compare(req.body.password, user.password);
            if (!isSuccess) {
                return res.status(
                    403).send("Email or password is wrong!");
            } else {
                const token = user.createAuthToken();
                res.header("x-auth-token", token).send(token);
            }
        }
    }
}

exports.singleUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  };



exports.userList = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
}

exports.userAdd = async (req, res) => {
    const { error } = registerValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(401).send("this user already existed");
        } else {
            if (req.body.role === "admin") {
                res.status(403).send("ERROR! You are doing something you dont have the authority to do! ")
            } else {
                const hashPassword = await bcrypt.hash(req.body.password, 10);
                user = new User(req.body);
                user.password = hashPassword;

                const token = user.createAuthToken();
                const result = user.save();
                res.status(201).header("x-auth-token", token).send(result);
            }
        }
    }
}
exports.userEdit = async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return res.status(404).send("There is no such data.");
    } else {
      const user = await User.findByIdAndUpdate(req.params.id, { ...req.body });
      await user.save();
      res.status(200).json(user);
    }
  };

exports.userDelete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
}