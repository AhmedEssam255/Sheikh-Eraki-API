import Messages from '../../models/messagesModel.js';
import getData from '../../lib/getData.js';
  
const getMessages = getData( Messages, 'title' );

export { getMessages };

