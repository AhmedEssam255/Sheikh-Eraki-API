const deleteData = ( model, searchObject ) => {
  return async ( req, res ) => {
    try {
      const deleted = await model.deleteOne( searchObject );
      
      if ( deleted.deletedCount >= 1 ) {
        return res.status( 200 ).json( { message: 'Deleted successfully' } );
      } else {
        return res.status( 404 ).json( { message: 'Data missing from DB' } );
      }
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || 'Error fetching messages';
      throw error;
    }
  };
};

export default deleteData;