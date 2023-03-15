//import from packages
const express = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const { request } = require('http');
const auth = require("../middlewares/auth");
const authController = require('../controllers/auth');

// authRouter.get('/user', (req, res) => {
//     res.json({msg: "Zack"})
// })

authRouter.post('/api/signup', async (req, res) => {
    try {
        // Get data from client
        const { name, email, password } = req.body;
        // Post that data in database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with same email already exists!" })
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        // return that data to user
        let user = new User({
            email,
            password: hashedPassword,
            name,
        })

        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//Sign in route 
authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email not found!" })
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password incorrect!" })
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc })

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.post('/tokenIsValid', async (req, res) => {
    try {

        const token = req.header('x-auth-token');
        if (!token) {
            return res.json(false);
        } //token check

        const verified = jwt.verify(token, 'passwordKey');
        if (!verified) {
            return res.json(false);
        } //verify

        const user = await User.findById(verified.id);
        if (!user) {
            return res.json(false);
        } //user

        res.json(true);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//get user data
authRouter.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ ...user._doc, token: req.token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRouter.get("/auth", auth, authController.getUser)

module.exports = authRouter;