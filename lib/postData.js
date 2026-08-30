const postData = ( model, object ) => {
  return async ( req, res ) => {
    try {
      const created = await model.create( object );
      
      if (created) return res.status(200).json({ message: 'Added successfully' });
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || 'Error fetching messages';
      throw error;
    }
  };
};

export default postData;