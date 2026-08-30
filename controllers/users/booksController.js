import Books from '../../models/booksModel.js';
import getData from '../../lib/getData.js';

const getBooks = getData( Books, 'name' );

export { getBooks };
