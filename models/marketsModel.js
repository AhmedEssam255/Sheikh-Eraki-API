import mongoose from 'mongoose';
import validateUrl from '../lib/validateUrl.js';

const marketsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (x) => x.length > 0,
  },
  url: {
    type: String,
    required: true,
    validate: (x) => validateUrl(x),
  },
});

const Markets = mongoose.model('Markets', marketsSchema);
export default Markets;
