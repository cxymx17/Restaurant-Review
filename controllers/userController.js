const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const path = require('path');
const bcrypt = require('bcrypt');




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
        // Replace backslashes with forward slashes in the image path
        if (user.avatar) {
          user.avatar = user.avatar.replace(/\\/g, '/');
        }
  
        // Pass the 'avatar' field along with other user information to the EJS template
        res.render('profile', { user, userReviews, reviews, avatar: user.avatar }); // Pass 'avatar' field
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
      const user = await User.findOne({ username });

      if (user) {
        // Compare the hashed input password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Successful login
          req.session.user = user;

          // Check if "Remember me" token exists
          const rememberMeToken = req.headers['remember-me-token'];
          if (rememberMeToken) {
            // Perform additional validation for the persistent token (replace with your own validation logic)
            if (rememberMeToken === 'your_persistent_token_here') {
              // Automatically log in the user
              console.log('Automatic login for user:', user.username);
              return res.status(200).json({ message: 'Login successful' });
            } else {
              console.log('Invalid persistent token');
            }
          }

          console.log('Login successful for user:', user.username);
          return res.status(200).json({ message: 'Login successful' });
        } else {
          console.log('Invalid username or password:', username);
          return res.status(401).json({ error: 'Invalid username or password.' });
        }
      } else {
        console.log('User not found:', username);
        return res.status(401).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  register: async (req, res) => {
    try {
      const { fullname, username, password } = req.body;
  
      if (!fullname || !username || !password) {
        return res.status(400).send('All fields (except Description) are required for registration.');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const avatarPath = req.file ? req.file.path : '/uploads';
      console.log('Avatar Path:', avatarPath);
      
      // Add the check for user.avatar here
      if (!avatarPath) {
        avatarPath = ''; // Set to an empty string if it's not available
      }

      let newUser = new User({
        fullname,
        username,
        password: hashedPassword,
        description: req.body.description,
        avatar: avatarPath,
      });
  
      // Save the new user to the database
      await newUser.save();
      console.log('User added successfully');
  
      // Update the avatar in associated reviews
      const reviews = await Review.find({ username });
      for (const review of reviews) {
        // Only update the review's avatar if the user's avatar path is not empty
        if (avatarPath !== '/uploads') {
          review.avatar = avatarPath;
          await review.save();
        }
      }
  
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
      user.avatar = req.file.path;
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
