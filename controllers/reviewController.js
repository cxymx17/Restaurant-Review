const Review = require('../models/reviewModel');
const User = require('../models/userModel');

const reviewController = {
  submitReview: async (req, res) => {
    try {

    
        if (!req.session.user || !req.session.user.username) {
            // Redirect guests to index.html or handle as needed
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

      // Redirect to a specific page after review submission (e.g., the homepage)
      res.redirect('/restau1');
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  getRestaurants: async (req, res) => {
    try {
        // Fetch reviews from MongoDB Atlas
        const reviews = await Review.find();

        // Fetch categories from MongoDB Atlas
        const categories = await Category.find();

        // Render the EJS template with reviews, categories, and user information
        res.render('restau1', { reviews, categories, user: req.session.user });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
  },
  

};

module.exports = reviewController;