import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';


export default combineReducers({
    //just to get the project started
    // replaceMe: () => 'asdf'
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});