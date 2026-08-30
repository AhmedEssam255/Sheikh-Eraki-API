const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate key error' });
  } else if (err.status) {
    return res
      .status(err.status)
      .json({ message: err.message ? err.message : 'An error occurred' });
  } else {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default errorHandler;
