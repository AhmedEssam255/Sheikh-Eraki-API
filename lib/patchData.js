const patchData = ( model, searchObject, updateObject ) => {
  return async ( req, res ) => {
    try {
      const updated = await model.updateOne( searchObject, updateObject );
      
      if ( updated.modifiedCount >= 1 ) {
        return res.status( 200 ).json( { message: 'Updated successfully' } );
      } else {
        return res.status( 400 ).json( { message: 'Data missing or duplicated' } );
      }
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || 'Error fetching messages';
      throw error;
    }
  };
};

export default patchData;