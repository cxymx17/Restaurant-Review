const mongoose = require('mongoose'); // Import mongoose library
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const Category = require('../models/categoriesModel');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files

const reviewController = {
  submitReview: [
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.session.user || !req.session.user.username) {
        return res.redirect('/index.html');
      }

      // Create a new review instance with the request body, including categoryID
      let newReview = new Review({
        username: req.session.user.username,
        title: req.body.title,
        body: req.body.body,
        recommended: req.body.recommendation === 'recommend',
        image: req.file ? req.file.path : '', // Save the file path in the database
        categoryID: req.body.categoryID, // Add categoryID property
        avatar: req.session.user.avatar ? req.session.user.avatar : 'uploads',
      });      

      // Save the new review to the database
      await newReview.save();
      console.log('Review added successfully');

      // Redirect back to the referring page
      res.redirect('back');

    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).send('Internal Server Error');
    }
  },
],


  // submitReview: [
  //   upload.single('image'), // Use multer middleware to handle file upload
  //   async (req, res) => {
  //     try {
  //       if (!req.session.user || !req.session.user.username) {
  //         return res.redirect('/index.html');
  //       }

  //       let newReview = new Review({
  //         username: req.session.user.username,
  //         title: req.body.title,
  //         body: req.body.body,
  //         recommended: req.body.recommendation === 'recommend',
  //         image: req.file ? req.file.path : '', // Save the file path in the database
  //       });

  //       await newReview.save();
  //       console.log('Review added successfully');

  //       res.redirect('/restau1');
  //     } catch (error) {
  //       console.error('Error adding review:', error);
  //       res.status(500).send('Internal Server Error');
  //     }
  //   },
  // ],

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

  deleteReview: async (req, res) => {
    const reviewId = req.params.reviewId;

    try {
      if (!req.session.user || !req.session.user.username) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const reviewToDelete = await Review.findById(reviewId);

      if (!reviewToDelete) {
        return res.status(404).json({ error: 'Review not found' });
      }

      // Check if the logged-in user is the owner of the review
      if (reviewToDelete.username !== req.session.user.username) {
        return res.status(403).json({ error: 'Forbidden: Cannot delete review' });
      }

      // Delete the review
      await Review.findByIdAndDelete(reviewId);

      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  





  editReview: async (req, res) => {
    try {
  
      //console.log('Inside editReview function');
      const reviewId = req.params.reviewId;
  
      // Ensure reviewId is a valid ObjectId before querying the database
      if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({ error: 'Invalid reviewId' });
      }
  
      // Fetch the review from the database based on the reviewId
      const review = await Review.findById(reviewId);
  
      if (review) {
        // Render the 'editReview.ejs' file and pass the review data
        res.render('editReview', { review });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } catch (error) {
      console.error('Error rendering editReview page:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  
  updateReview: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
  
      // Fetch the review from the database based on the reviewId
      const review = await Review.findById(reviewId);
  
      if (review) {
        // Update the review data based on the form submission
        review.title = req.body.title;
        review.body = req.body.body;
        review.recommended = req.body.recommendation === 'true';
        
        // Check if a new file is uploaded
        if (req.file) {
          review.image = req.file.path;
        }
  
        // Save the updated review to the database
        await review.save();
  
        res.redirect('/profile');
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },



  markAsHelpful: async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const review = await Review.findByIdAndUpdate(reviewId, { $inc: { helpful: 1 } }, { new: true });
        res.json(review);
    } catch (error) {
        console.error('Error marking as helpful:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},

markAsUnhelpful: async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const review = await Review.findByIdAndUpdate(reviewId, { $inc: { unhelpful: 1 } }, { new: true });
        res.json(review);
    } catch (error) {
        console.error('Error marking as unhelpful:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},
  

};



module.exports = reviewController;