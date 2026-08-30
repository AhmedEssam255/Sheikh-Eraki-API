import Markets from '../../models/marketsModel.js';
import getData from '../../lib/getData.js';

const getMarkets = getData(Markets, 'name');

export { getMarkets };
