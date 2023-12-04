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
const path = require('path');

const multer = require('multer');
const bcrypt = require('bcrypt');
//const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');  // Set the views directory

mongoose.connect('mongodb+srv://Cymbeline:Cymbeline.anne@cluster0.q20uyuy.mongodb.net/cluster0');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });

//const reviews = Review.find().populate('userId').exec();
//console.log(reviews);


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



app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Route for log in
app.post('/login', userController.login);

// Route for user registration
app.post('/register', upload.single('avatar'), userController.register);



// Add the route for viewing the profile
app.get('/profile', userController.viewProfile);



app.get('/restau1', async (req, res) => {
    try {
        // Fetch reviews from MongoDB Atlas
        const reviews = await Review.find(); // Assuming you have a Review model

        // Fetch categories from MongoDB Atlas
        const categories = await Category.find();

        // Determine the selected category ID based on the route
        let selectedCategoryId;

        // Loop through categories to find the selected category ID based on the route and category name
        categories.forEach((category, index) => {
            if (!selectedCategoryId && category.name === 'DIN TAI FUNG' && req.originalUrl === '/restau1') {
                selectedCategoryId = category._id;
            } else if (!selectedCategoryId && req.originalUrl === `/restau${index + 1}`) {
                selectedCategoryId = category._id;
            }
        });

        console.log('Selected Category ID:', selectedCategoryId); // Add this log statement

        // Filter reviews based on the selected category ID
        const filteredReviews = reviews.filter(review => {
            const reviewCategoryId = review.categoryID?.toString(); // Convert ObjectId to string for comparison
            return selectedCategoryId && reviewCategoryId === selectedCategoryId.toString();
        });

        console.log('Filtered Reviews:', filteredReviews); // Add this log statement

        // Render the EJS template with filtered reviews, categories, and user information
        res.render('restau1', { reviews: filteredReviews, categories, user: req.session.user, selectedCategoryId });
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

        // Determine the selected category ID based on the route
        let selectedCategoryId;

        // Loop through categories to find the selected category ID based on the route and category name
        categories.forEach((category, index) => {
            if (!selectedCategoryId && category.name === 'The Aristocrat' && req.originalUrl === '/restau2') {
                selectedCategoryId = category._id;
            } else if (!selectedCategoryId && req.originalUrl === `/restau${index + 1}`) {
                selectedCategoryId = category._id;
            }
        });

        console.log('Selected Category ID:', selectedCategoryId); // Add this log statement

        // Filter reviews based on the selected category ID
        const filteredReviews = reviews.filter(review => {
            const reviewCategoryId = review.categoryID?.toString(); // Convert ObjectId to string for comparison
            return selectedCategoryId && reviewCategoryId === selectedCategoryId.toString();
        });

        console.log('Filtered Reviews:', filteredReviews); // Add this log statement

        // Render the EJS template with filtered reviews, categories, and user information
        res.render('restau2', { reviews: filteredReviews, categories, user: req.session.user, selectedCategoryId });
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

        // Determine the selected category ID based on the route
        let selectedCategoryId;

        // Loop through categories to find the selected category ID based on the route and category name
        categories.forEach((category, index) => {
            if (!selectedCategoryId && category.name === "Italliani's" && req.originalUrl === '/restau3') {
                selectedCategoryId = category._id;
            } else if (!selectedCategoryId && req.originalUrl === `/restau${index + 1}`) {
                selectedCategoryId = category._id;
            }
        });

        console.log('Selected Category ID:', selectedCategoryId); // Add this log statement

        // Filter reviews based on the selected category ID
        const filteredReviews = reviews.filter(review => {
            const reviewCategoryId = review.categoryID?.toString(); // Convert ObjectId to string for comparison
            return selectedCategoryId && reviewCategoryId === selectedCategoryId.toString();
        });

        console.log('Filtered Reviews:', filteredReviews); // Add this log statement

        // Render the EJS template with filtered reviews, categories, and user information
        res.render('restau3', { reviews: filteredReviews, categories, user: req.session.user, selectedCategoryId });
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

        // Determine the selected category ID based on the route
        let selectedCategoryId;

        // Loop through categories to find the selected category ID based on the route and category name
        categories.forEach((category, index) => {
            if (!selectedCategoryId && category.name === 'Lugang Cafe' && req.originalUrl === '/restau4') {
                selectedCategoryId = category._id;
            } else if (!selectedCategoryId && req.originalUrl === `/restau${index + 1}`) {
                selectedCategoryId = category._id;
            }
        });

        console.log('Selected Category ID:', selectedCategoryId); // Add this log statement

        // Filter reviews based on the selected category ID
        const filteredReviews = reviews.filter(review => {
            const reviewCategoryId = review.categoryID?.toString(); // Convert ObjectId to string for comparison
            return selectedCategoryId && reviewCategoryId === selectedCategoryId.toString();
        });

        console.log('Filtered Reviews:', filteredReviews); // Add this log statement

        // Render the EJS template with filtered reviews, categories, and user information
        res.render('restau4', { reviews: filteredReviews, categories, user: req.session.user, selectedCategoryId });
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

        // Determine the selected category ID based on the route
        let selectedCategoryId;

        // Loop through categories to find the selected category ID based on the route and category name
        categories.forEach((category, index) => {
            if (!selectedCategoryId && category.name === 'Bistro Ravioli' && req.originalUrl === '/restau5') {
                selectedCategoryId = category._id;
            } else if (!selectedCategoryId && req.originalUrl === `/restau${index + 1}`) {
                selectedCategoryId = category._id;
            }
        });

        console.log('Selected Category ID:', selectedCategoryId); // Add this log statement

        // Filter reviews based on the selected category ID
        const filteredReviews = reviews.filter(review => {
            const reviewCategoryId = review.categoryID?.toString(); // Convert ObjectId to string for comparison
            return selectedCategoryId && reviewCategoryId === selectedCategoryId.toString();
        });

        console.log('Filtered Reviews:', filteredReviews); // Add this log statement

        // Render the EJS template with filtered reviews, categories, and user information
        res.render('restau5', { reviews: filteredReviews, categories, user: req.session.user, selectedCategoryId });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Assuming you have a route for viewing the profile
app.get('/profile', async (req, res) => {
    // Check if the user is authenticated
    if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login page or handle as needed
    }
  
    try {
      // Assuming you have a User model and the session user ID is stored in req.session.user._id
      const user = await User.findById(req.session.user._id);
  
      // Check if the user was found
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Fetch the user's avatar image path
      const avatarPath = user.avatar || ''; // Replace 'avatar' with the actual field name for the avatar path
  
      // Replace backslashes with forward slashes in the image path
      //const avatarUrl = avatarPath.replace(/\\/g, '/');
  
      // Fetch the reviews data from your database (replace this with your actual code)
      const reviews = await Review.find({ username: user.username }); // Fetch reviews for the user
  
      // Render the 'profile.ejs' file and pass the user, avatarUrl, and reviews data
      res.render('profile', { user: user, avatarUrl: avatarUrl, reviews: reviews });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Internal Server Error');
    }
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

// Endpoint to fetch reviews with optional categoryID filter
app.get('/api/reviews', async (req, res) => {
    try {
        const categoryID = req.query.categoryID; // Get categoryID from the query parameters

        // If categoryID is provided, filter reviews by category
        const filter = categoryID ? { categoryID } : {};
        
        const reviews = await Review.find(filter);
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submitReview', reviewController.submitReview);



// Route for deleting a user review hehe
app.delete('/reviews/:reviewId', reviewController.deleteReview);


// Route for updating user profile
app.post('/updateProfile', upload.single('avatar'), userController.updateProfile);


// Add the route for editing reviews
app.get('/editReview/:reviewId', reviewController.editReview);

// Handle the form submission for editing reviews
//app.post('/editReview/:reviewId', reviewController.updateReview);

app.post('/editReview/:reviewId', upload.single('image'), reviewController.updateReview);

//About us
app.get('/aboutus', (req, res) => {
    res.sendFile(__dirname + '/views/aboutus.html');
});

// Add routes for marking reviews as helpful/unhelpful
app.put('/reviews/:reviewId/markAsHelpful', reviewController.markAsHelpful);
app.put('/reviews/:reviewId/markAsUnhelpful', reviewController.markAsUnhelpful);

app.use(express.static(__dirname + '/views'));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));



app.listen(3000, () => {
    console.log('Server is running');
});
