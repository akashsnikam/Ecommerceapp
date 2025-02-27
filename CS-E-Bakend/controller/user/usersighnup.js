const userModel = require("../../models/usermodel");

const bcrypt = require("bcrypt");

async function usersighnupController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });

    console.log("user", user);

    if (user) {
      throw new Error("Already user exits.");
    }

    if (!email) {
      throw new Error("plese Provide email");
    }
    if (!password) {
      throw new Error("plese Provide password");
    }
    if (!name) {
      throw new Error("plese Provide name");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",

      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "user created successfully",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = usersighnupController;
