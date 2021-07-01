const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await Users.findOne({ email: email });
            if (user)
                return res.status(400).json({ msg: "Email is already exists." });
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash,
            });
            await newUser.save();
            res.json({ msg: "SignUp Successfully" });
            res.end();
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email: email });
            if (!user)
                return res
                    .status(400)
                    .json({ msg: "User not exist Please make new one" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

            //if Login successful create token
            const payload = { id: user._id, name: user.username };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: "1d",
            });
            res.json({ token });
            res.json({ msg: "Login a User" });
        } 
        catch (err) {
            // return res.status(500).json({ msg: "Something Wrong" });
            console.log(err)
        }
    },
    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization");
            if (!token) return res.send(false);

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
                if (err) return res.send(false);
                const user = await Users.findById(verified.id);
                if (!user) return res.send(false);
                return res.send(true);
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = userController;
