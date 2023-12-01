const User = require('../models/userModel');
const Review = require('../models/reviewModel');

const userController = {
  viewProfile: async (req, res) => {
    try {

    
      if (!req.session.user || !req.session.user.username) {
        // Redirect guests to index.html or handle as needed
        return res.redirect('/index.html');
      }

      const { username } = req.session.user; 

      // Retrieve user information and their reviews from the database
      const user = await User.findOne({ username });
      const userReviews = await Review.find({ username });

      
      const reviews = await Review.find();

      if (user) {
        // Render the profile page with user information and all reviews
        res.render('profile', { user, userReviews, reviews });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error viewing profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  
  
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validate username and password 
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }

      // Check if the user exists in the database
      const user = await User.findOne({ username, password });

      if (user) {
        // Successful login, set the user information in the session
        req.session.user = user;
        console.log('Login successful for user:', user.username);
        return res.status(200).json({ message: 'Login successful' });
      } else {
        console.log('Invalid username or password:', username);
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
    try {
      const { fullname, username, password } = req.body;

      // Validate required fields for registration
      if (!fullname || !username || !password) {
        return res.status(400).send('All fields (except Description) are required for registration.');
      }

      // Create a new user instance with the request body
      let newUser = new User({
        fullname,
        username,
        password,
        description: req.body.description,
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
  },

  updateProfile: async (req, res) => {
    try {
      const { username } = req.session.user;

      const user = await User.findOne({ username });
      const reviews = await Review.find({ username });

      user.fullname = req.body.fullname;
      user.username = req.body.username;
      user.password = req.body.password;
      user.description = req.body.description;

      if (req.file) {
        user.profilePicture = req.file.path;
      }

      for (const review of reviews) {
        review.username = req.body.username;
        await review.save();
      }

      await user.save();

      req.session.user = user;

      res.redirect('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('Internal Server Error');
    }
  },

};

module.exports = userController;