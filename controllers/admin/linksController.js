import Links from '../../models/linksModel.js';
import validateUrl from '../../lib/validateUrl.js';
import postData from '../../lib/postData.js';
import patchData from '../../lib/patchData.js';
import deleteData from '../../lib/deleteData.js';

const postLink = async (req, res) => {
  try {
    const { icon, title, href } = req.body || {};

    if (
      typeof icon !== 'string' ||
      !icon.length > 0 ||
      typeof title !== 'string' ||
      !title.length > 0 ||
      !validateUrl(href)
    ) {
      return res.status(400).json({ message: 'Data missing or invalid' });
    }

    await postData(Links, { icon: icon, title: title, href: href })(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error fetching messages';
    throw error;
  }
};

const patchLink = async (req, res) => {
  try {
    const { href, updateObject } = req.body || {};

    if (!href || typeof href !== 'string' || !validateUrl(href)) {
      return res
        .status(400)
        .json({ message: 'Missing or invalid link identifier href.' });
    }

    if (!updateObject || typeof updateObject !== 'object') {
      return res
        .status(400)
        .json({ message: 'Update data object is missing.' });
    }

    const hasTitle = 'title' in updateObject;
    const hasHref = 'href' in updateObject;
    const hasIcon = 'icon' in updateObject;

    if (!hasTitle && !hasHref && !hasIcon) {
      return res
        .status(400)
        .json({
          message: 'Nothing to update. Provide a title, href, or icon.',
        });
    }

    if (
      hasTitle &&
      (typeof updateObject.title !== 'string' ||
        updateObject.title.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({
          message: 'The provided update title must be a non-empty string.',
        });
    }

    if (
      hasHref &&
      (typeof updateObject.href !== 'string' || !validateUrl(updateObject.href))
    ) {
      return res
        .status(400)
        .json({ message: 'The provided update href URL is invalid.' });
    }

    if (
      hasIcon &&
      (typeof updateObject.icon !== 'string' ||
        updateObject.icon.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({
          message: 'The provided update icon must be a non-empty string.',
        });
    }

    await patchData(Links, { href: href }, updateObject)(req, res);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error updating link';
    throw error;
  }
};

const deleteLink = async (req, res) => {
  try {
    const { href } = req.query || {};

    if (!href || typeof href !== 'string' || !validateUrl(href)) {
      return res
        .status(400)
        .json({ message: 'Missing or invalid link identifier href.' });
    }

    await deleteData(Links, { href: href })(req, res);
  } catch ( error ) {
    error.status = error.status || 500;
    error.message = error.message || 'Error deleting link';
    throw error;
  }
}

export { postLink, patchLink, deleteLink };