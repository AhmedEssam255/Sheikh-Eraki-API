import mongoose from 'mongoose';
import validateUrl from '../lib/validateUrl.js';

const linksSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    validate: (x) => validateUrl(x),
  },
  title: {
    type: String,
    required: true,
    unique: true,
    validate: (x) => x.length > 0,
  },
  href: {
    type: String,
    required: true,
    unique: true,
    validate: (x) => validateUrl(x),
  },
});

const Links = mongoose.model('Links', linksSchema);
export default Links;
