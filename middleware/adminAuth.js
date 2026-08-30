const adminAuth = (req, res, next) => {
  try {
    if ( req.session.isLoggedIn ) {
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch ( error ) {
    error.status = error.status || 500;
    error.message = error.message || 'Error fetching messages';
    throw error;
  }
};

export default adminAuth;