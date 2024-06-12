require('./db/connection');
const ModelConst = require('./schema/schema');
const E = require('express');
const app = E();
const bp = require('body-parser');
const ejs = require('ejs');
const path = require('path');

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// Render home, student, and event pages
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/student', (req, res) => {
    res.render('student');
});

app.get('/event', (req, res) => {
    res.render('event');
});

// Register a new user
app.post('/reg', async (req, res) => {
    console.log(req.body);
    const { name, email, job, password, cpassword } = req.body;

    if (!name || !email || !job || !password || !cpassword) {
        return res.send("Please fill all the fields");
    }

    const emailExist = await ModelConst.findOne({ email });
    if (emailExist) {
        return res.send("Email already exists");
    }

    if (password !== cpassword) {
        return res.send("Password didn't match");
    }

    const newUser = new ModelConst({ name, email, job, password, cpassword });
    await newUser.save();
    return res.send("Registration successful");
});

// Login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send("Please fill all the fields");
    }

    const user = await ModelConst.findOne({ email });
    if (!user) {
        return res.send("User does not exist, please register first");
    }

    if (password !== user.password) {
        return res.send("Password is incorrect");
    }

    return res.send("Sign-in successful");
});

// Forgot password form
app.get('/forgot', (req, res) => {
    res.render('forgot');
});

// Reset password endpoint
app.put('/reset-password', async (req, res) => {
    try {
        const emailExist = await ModelConst.findOne({ email: req.body.email });
        if (!emailExist) {
            return res.send("User doesn't exist");
        } else {
            emailExist.password = req.body.password;
            await emailExist.save();
            return res.send("Password updated successfully");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred while updating the password");
    }
});

// Handle all other routes
app.get('*', (req, res) => {
    res.send("This page doesn't exist");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
