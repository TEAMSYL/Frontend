import isLogin from './isLogin';
import { combineReducers } from 'redux';
import socket from './socket';
const rootReducer = combineReducers({
    isLogin,
    socket
});

export default rootReducer;