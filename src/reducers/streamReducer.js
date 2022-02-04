import _ from 'lodash';
//Each of the different types maps up to a different response from the API
//Ex if we see an action with a type FETCH_STREAMS, this means we are getting back an array of records.That array of records will be merged into the state object
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
//             //take whatever object comes out of mapKeys and add it to the overall object
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case FETCH_STREAM:
//             //add a new key/value pair on the fly
//             //The key will be the streams id and the value will be the actual stream itself This is key interpolation
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM://the payload is the id itself so we do not have to reference .id property
        //this creates a new object without
            return _.omit(state, action.payload)
        default:
            return state;
    }
}