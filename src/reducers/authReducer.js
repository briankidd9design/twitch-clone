import {SIGN_IN, SIGN_OUT} from '../actions/types';

//the capitalization of INITIAL_STATE means that it is a true constant object and the value inside it should not be changed. 
//Do not try to modify this object under any circumstance whatsoever
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};
//if state gets called with an initial value of undefined, then state will have the value defined as INITIAL_STATE
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null }
        default:
            return state;
    }
};