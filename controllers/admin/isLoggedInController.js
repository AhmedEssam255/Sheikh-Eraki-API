const isLoggedIn = (req, res) => {
  try {
    return res.status(200).json({ isLoggedIn: true });
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error fetching messages';
    throw error;
  }
};

export { isLoggedIn };
