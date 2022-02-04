import streams from '../apis/streams';
import history from '../history';
import {
        SIGN_IN, 
        SIGN_OUT, 
        CREATE_STREAM,
        FETCH_STREAMS,
        FETCH_STREAM,
        DELETE_STREAM,
        EDIT_STREAM
} from './types';
//All of the action creators were created all at once because of following REST-full conventions and we know exactly what route we are tyring to make a request to, what information each request needs, and we know what the response is going to be in each case

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};
//post request with Axios
//The formValues object and the userID should be posted to the stream's endpoint
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        //getState will return the entire state object
        const { userId } = getState().auth;
       const response = await streams.post('/streams', { ...formValues, userId });

       dispatch({ type: CREATE_STREAM, payload: response.data });
       //programmatic navigation to 
       //get the user back to the root route
       //since we are using navigation within an ActionCreator we should used the history component.
       history.push('/');
    };
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}
// anytime the streamEdit component is mounted on the screen want to make sure to call fetchStream with the id of the stream selected to be fetched
export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
}
//the id of the stream and also the values that you want to update for the stream
export const editStream = (id, formValues) => async dispatch => {
    //with PATCH instead of PUT request just the formValues will get updated and any properties of the stream will not be destroyed
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data});
    //direct the user back to the rooot route of the application
    history.push('/');
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
}