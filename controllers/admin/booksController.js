import Books from '../../models/booksModel.js';
import validateUrl from '../../lib/validateUrl.js';
import postData from '../../lib/postData.js';
import patchData from '../../lib/patchData.js';
import deleteData from '../../lib/deleteData.js';

const postBook = async (req, res) => {
  try {
    const { name, url } = req.body || {};

    if (
      typeof name !== 'string' ||
      !name.length > 0 ||
      typeof url !== 'string' ||
      !validateUrl(url)
    ) {
      return res.status(400).json({ message: 'Data missing or invalid' });
    }

    await postData(Books, { name: name, url: url })(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error fetching messages';
    throw error;
  }
};

const patchBook = async (req, res) => {
  try {
    const { url, updateObject } = req.body || {};

    if (!url || typeof url !== 'string' || !validateUrl(url)) {
      return res
        .status(400)
        .json({ message: 'Missing or invalid book identifier URL.' });
    }

    if (!updateObject || typeof updateObject !== 'object') {
      return res
        .status(400)
        .json({ message: 'Update data object is missing.' });
    }

    const hasName = 'name' in updateObject;
    const hasUrl = 'url' in updateObject;

    if (!hasName && !hasUrl) {
      return res
        .status(400)
        .json({ message: 'Nothing to update. Provide a name or a url.' });
    }

    if (
      hasName &&
      (typeof updateObject.name !== 'string' ||
        updateObject.name.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({
          message: 'The provided update name must be a non-empty string.',
        });
    }

    if (
      hasUrl &&
      (typeof updateObject.url !== 'string' || !validateUrl(updateObject.url))
    ) {
      return res
        .status(400)
        .json({ message: 'The provided update URL is invalid.' });
    }

    await patchData(Books, { url: url }, updateObject)(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error updating book';
    throw error;
  }
};

const deleteBook = async (req, res) => {
  try {
    const { url } = req.query || {};

    if (typeof url !== 'string' || !validateUrl(url)) {
      return res.status(400).json({ message: 'Data missing or invalid' });
    }

    await deleteData(Books, { url: url })(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error fetching messages';
    throw error;
  }
};

export { postBook, patchBook, deleteBook };
