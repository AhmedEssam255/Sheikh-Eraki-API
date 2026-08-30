const getData = (model, queryTarget) => {
  return async (req, res) => {
    try {
      const searchQuery = req.query.search || null;

      if (searchQuery) {
        const queryResult = await model.find(
          {
            [queryTarget]: { $regex: searchQuery, $options: 'i' },
          },
          { _id: 0, __v: 0 },
        );

        return res.status(200).json(queryResult);
      } else {
        const allData = await model.find({}, { _id: 0, __v: 0 });

        return res.status(200).json(allData);
      }
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || 'Error fetching books';
      throw error;
    }
  };
};

export default getData;
