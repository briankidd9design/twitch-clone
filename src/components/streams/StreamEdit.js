import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';


//StreamEdit Component has access to the props object
//That props object knows about the ID of the stream that we are trying to show
//Props object is only accessible inside of StreamEdit function
class StreamEdit extends React.Component {
    componentDidMount( ){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        console.log(formValues);
        //we PUT a title and description but now we are missing the userID 
        //when we made the PUT request a userId was not included
        this.props.editStream(this.props.match.params.id, formValues);
    }
    render() {
    if (!this.props.stream) {    
        return (
            <div>Loading...</div>  
            )
        }
        return (
             <div>
                <h3>Edit a Stream </h3>
                <StreamForm 
                //the outer braces indicate we are going to be using JSX and the inner braces indicate that we are going to be passing an object
                // the initial values of the fields in StreamForm will be shown by 
                // initialValues={this.props.stream }
                // initialValues={{ title: this.props.stream.title, description:this.props.streams.description }}
                // or you can use lodash VVVVV
                initialValues={_.pick(this.props.stream, 'title', 'description')}
                onSubmit={this.onSubmit} />
            </div>
        )
    }
};

//mapStateToProps knows about the list of streams that is stored inside of the state object
//
// The mapStateToProps function is used in the Redux pattern to reflect any updates to the Redux store and merge them into props in your component. The Redux store serves as a centralized place for the state to live in your application.
const mapStateToProps = (state, ownProps) => {
    
    return{ stream: state.streams[ownProps.match.params.id] };
};


// export default connect(mapStateToProps) (StreamEdit);
export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);