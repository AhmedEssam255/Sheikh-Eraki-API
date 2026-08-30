const notFound = (req, res) => {
  const error = new Error('Not Found');
  error.status = 404;
  return res.status(404).json({ message: 'Not Found' });
};

export default notFound;