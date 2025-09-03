const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//registerUser
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: 'User already exists' });
        const hashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashed
        });

        // jwt token containing mongodb_userd as payload
        const token = jwt.sign(
            { id: newUser._id },  //payload
            process.env.JWT_SECRET,
            { expiresIn: '7D' }
        );
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            message: "registration Successful"
        }); //send back the token

    } catch (error) {
        res.status(500).json({ message: 'registration failed', error: error.message });
    }
};

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exixtingUser = await User.findOne({ email });

        if (!exixtingUser)
            return res.status(400).json({ message: 'wrong Credentials' });

        const isMatch = await bcrypt.compare(password, exixtingUser.password);

        if (!isMatch)
            return res.status(400).json({ message: 'wrong Credentials' })

        //generate token if credentials is right
        const token = jwt.sign(
            { id: exixtingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7D' }
        );
        return res.status(200).json({
            token,
            user: {
                id: exixtingUser._id,
                username: exixtingUser.username,
                email: exixtingUser.email
            },
            message: "Login Successfuly"
        });
    } catch (error) {
        return res.status(500).json({ message: 'Login Failed', error: error.message });
    }
};

// profile(protected)
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user)
            return res.status(404).json({ message: 'user not found' });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: 'failed to fetch profile', error: err.message });
    }
};