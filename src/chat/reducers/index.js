// import {fetchMessage} from "../action/index";
import {combineReducers} from 'redux'
import messagesReducer from './setMessages';

const rootReducer = combineReducers({
    messages: messagesReducer, 
});
export default rootReducer;