import React from "react";
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';
//Field is a component and reduxForm is a function that will have the same fucntionality as the connect function that we used from the Redux library
//the reduxForm function will call an ActionCreator and get form data into the the component
// const StreamCreate = () => {
//     return <div>StreamCreate</div>
// };
//a class component is used so that we can make helper methods to organize the code
class StreamCreate extends React.Component {
    //destructuring from meta prop
    //meta is getting passed through renderError and destructured


  // destructuring
  //label and input destructured off of formProps

//   onSubmit(event) {
//make sure call back functions have bind so they are bind to the component
onSubmit = (formValues) => {

  //whenever the user tries to submit the form, the inputs will be validated.
  //if the inputs are valid, onSubmit will be invoked
  //onSubmit is going to call action creator createStream
  //request will be made over to the API server to create a new stream
    this.props.createStream(formValues);
    // event.preventDefault() -- Actually Redux Form handles this for us
    // console.log(formValues);
  }

  render() {
   
    return (
        <div>   
            <h3>Create a Stream </h3>
            {/* onSubmit is the name of the prop and you are passing a reference to onSubmit method */}
            <StreamForm onSubmit = {this.onSubmit}/>
         </div>
    );
  }
}

export default connect(null, {
  createStream
})(StreamCreate);
