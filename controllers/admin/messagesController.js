import Messages from '../../models/messagesModel.js';
import postData from '../../lib/postData.js';
import patchData from '../../lib/patchData.js';
import deleteData from '../../lib/deleteData.js';

const postMessage = async (req, res) => {
  try {
    const { title, body } = req.body || {};

    if (
      typeof title !== 'string' ||
      title.trim().length === 0 ||
      typeof body !== 'string' ||
      body.trim().length === 0
    ) {
      return res
        .status(400)
        .json({
          message: 'Data missing or invalid. Both title and body are required.',
        });
    }

    await postData(Messages, { title, body })(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error creating message';
    throw error;
  }
};

const patchMessage = async (req, res) => {
  try {
    const { title, updateObject } = req.body || {};
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res
        .status(400)
        .json({ message: 'Missing or invalid message identifier title.' });
    }

    if (!updateObject || typeof updateObject !== 'object') {
      return res
        .status(400)
        .json({ message: 'Update data object is missing.' });
    }

    const hasTitle = 'title' in updateObject;
    const hasBody = 'body' in updateObject;

    if (!hasTitle && !hasBody) {
      return res
        .status(400)
        .json({ message: 'Nothing to update. Provide a title or a body.' });
    }

    if (
      hasTitle &&
      (typeof updateObject.title !== 'string' ||
        updateObject.title.trim().length === 0)
    ) {
      return res.status(400).json({
        message: 'The provided update title must be a non-empty string.',
      });
    }

    if (
      hasBody &&
      (typeof updateObject.body !== 'string' ||
        updateObject.body.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({
          message: 'The provided update body must be a non-empty string.',
        });
    }

     await patchData(Messages, { title: title }, updateObject)(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error updating message';
    throw error;
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { title } = req.query || {};

    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ message: 'Data missing or invalid' });
    }

    await deleteData(Messages, { title: title })(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error deleting message';
    throw error;
  }
};

export { postMessage, patchMessage, deleteMessage };
