import Links from '../../models/linksModel.js';
import getData from '../../lib/getData.js';

const getLinks = getData( Links, 'title' );

export { getLinks };
