const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const userController = require('./controllers/userController');
const User = require('./models/userModel');
const Review = require('./models/reviewModel');
const Category = require('./models/categoriesModel');
const reviewController = require('./controllers/reviewController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');  // Set the views directory

mongoose.connect('mongodb+srv://Cymbeline:Cymbeline.anne@cluster0.q20uyuy.mongodb.net/cluster0');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error', err);
        }

        res.redirect('/');
    });
});

// Import and use the login function from userController
app.post('/login', userController.login);

// Add the route for viewing the profile
app.get('/profile', userController.viewProfile);



app.get('/restau1', async (req, res) => {
    try {
        // Fetch reviews from MongoDB Atlas
        const reviews = await Review.find(); // Assuming you have a Review model

        // Fetch categories from MongoDB Atlas
        const categories = await Category.find();

        // Render the EJS template with reviews, categories, and user information
        res.render('restau1', { reviews, categories, user: req.session.user });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/restau2', async (req, res) => {
    try {
        // Fetch reviews from MongoDB Atlas
        const reviews = await Review.find(); // Assuming you have a Review model

        // Fetch categories from MongoDB Atlas
        const categories = await Category.find();

        // Render the EJS template with reviews, categories, and user information
        res.render('restau2', { reviews, categories, user: req.session.user });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restau3', async (req, res) => {
    try {
        // Fetch reviews from MongoDB Atlas
        const reviews = await Review.find(); // Assuming you have a Review model

        // Fetch categories from MongoDB Atlas
        const categories = await Category.find();

        // Render the EJS template with reviews, categories, and user information
        res.render('restau3', { reviews, categories, user: req.session.user });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restau4', async (req, res) => {
    try {
        // Fetch reviews from MongoDB Atlas
        const reviews = await Review.find(); // Assuming you have a Review model

        // Fetch categories from MongoDB Atlas
        const categories = await Category.find();

        // Render the EJS template with reviews, categories, and user information
        res.render('restau4', { reviews, categories, user: req.session.user });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restau5', async (req, res) => {
    try {
        // Fetch reviews from MongoDB Atlas
        const reviews = await Review.find(); // Assuming you have a Review model

        // Fetch categories from MongoDB Atlas
        const categories = await Category.find();

        // Render the EJS template with reviews, categories, and user information
        res.render('restau5', { reviews, categories, user: req.session.user });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Assuming you have a route for viewing the profile
app.get('/profile', function (req, res) {
    // Check if the user is authenticated

    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login page or handle as needed
    }

    // Render the 'profile.ejs' file and pass the user data from the session
    res.render('profile', { user: req.session.user });
});


// Assuming you have a route for editing the profile
app.get('/editprofile', function (req, res) {
   // Check if the user is authenticated
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login page or handle as needed
    }

    // Get the user data from the session
    const user = req.session.user;

    // Render the 'editprofile.ejs' file and pass the user data
    res.render('editprofile', { user });
});

// Fetch reviews from MongoDB
app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/', async (req, res) => {
    try {
        // Create a new user instance with the request body
        let newUser = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            password: req.body.password,
            description: req.body.description
        });

        // Save the new user to the database
        await newUser.save();
        console.log('User added successfully');

        // Redirect to the home page or any other desired page
        res.redirect('/');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to fetch reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*
app.post('/submitReview', async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.user) {
            return res.redirect('/index.html'); 
        }

        // Create a new review instance with the request body
        let newReview = new Review({
            username: req.session.user.username, // Use the username from the session
            title: req.body.title,
            body: req.body.body,
            recommended: req.body.recommendation === 'recommend',
            image: req.body.image,
        });

        // Save the new review to the database
        await newReview.save();
        console.log('Review added successfully');

        // Redirect to the restau1 page or any other desired page
        res.redirect('/restau1');
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).send('Internal Server Error');
    }
});
*/
app.post('/submitReview', reviewController.submitReview);


/*
app.post('/updateProfile', upload.single('avatar'), async (req, res) => {
    try {
        // Assuming you have the user's information stored in the session
        const { username } = req.session.user;

        // Find the user in the User collection
        const user = await User.findOne({ username });
        const reviews = await Review.find({ username });

        // Update user information based on the submitted form data
        user.fullname = req.body.fullname;
        user.username = req.body.username;
        user.password = req.body.password; 
        user.description = req.body.description;

        // Handle avatar upload
        if (req.file) {
            user.profilePicture = req.file.path; // Update with the actual field where you store the avatar path
        }

        // Update the username in all reviews by the user
        for (const review of reviews) {
            review.username = req.body.username;
            await review.save();
        }

        // Save the updated user information to the User collection
        await user.save();

        // Update user information in the session
        req.session.user = user;

        // Redirect back to the profile page
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }
});
*/

// Route for updating user profile
app.post('/updateProfile', upload.single('avatar'), userController.updateProfile);



app.use(express.static(__dirname + '/views'));

app.listen(3000, () => {
    console.log('Server is running');
});