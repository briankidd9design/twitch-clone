import React from "react";
import { Field, reduxForm } from "redux-form";
//This form will be re-used between StreamCreate and StreamEdit
//Field is a component and reduxForm is a function that will have the same fucntionality as the connect function that we used from the Redux library
//the reduxForm function will call an ActionCreator and get form data into the the component
// const StreamCreate = () => {
//     return <div>StreamCreate</div>
// };
//a class component is used so that we can make helper methods to organize the code
class StreamForm extends React.Component {
    //destructuring from meta prop
    //meta is getting passed through renderError and destructured
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

  // destructuring
  //label and input destructured off of formProps
  renderInput = ({ input, label, meta }) => {
      console.log(meta);
//   renderInput(formProps) {
    //Redux form is going to assume that you are doing the correct thing
    // return <div>I'm an input</div>
    //take the formProps and the input property out of it and hook up the relevant properties to the input
    // console.log({formProps});
    const className = `field ${meta.error && meta.touched ? 'error': '' }`;
    return (
    //   <div className="field">
    //   <label>{formProps.label}</label>
    //     <input
    //       onChange={formProps.input.onChange}
    //       value={formProps.input.value}
    //     />
    //   </div>
      //the ... takes all the input properts and adds them as props to the input element
      //destructuring will result in this
        //  <input {...formProps.input} />
    // <div className="field">
    <div className={className}>
        <label> {label} </label>
         <input {...input} autoComplete="off" />
         {/* <div>{meta.error}</div> */}
         {this.renderError(meta)}
    </div>
    );
  }

//   onSubmit(event) {
//make sure call back functions have bind so they are bind to the component
onSubmit = (formValues) => {

  //whenever the user tries to submit the form, the inputs will be validated.
  //if the inputs are valid, onSubmit will be invoked
  //onSubmit is going to call action creator createStream
  //request will be made over to the API server to create a new stream
    this.props.onSubmit(formValues);
    // event.preventDefault() -- Actually Redux Form handles this for us
    // console.log(formValues);
  }

  render() {
    console.log(this.props);
    return (
      // <div>StreamCreate</div>
      //name is like the name of the property that the field is going to manage.
      //VVV This is what you would usually do but not with ReduxForm
    //   <form onSubmit={this.onSubmit} className="ui form">
    //this.props.handleSubmit is provided by ReduxForm
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} 
      className="ui form error">
      {/* you can customize by adding additional props to the field element */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
   
    );
  }
}
//ReduxForm will look at the names property and the errors object that is returned from validate
//If a field has the same name as a property that exists inside the errors object
//Then ReduxForm is going to take the error message and pass it to the renderInput function for each field that gets created
const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        //only run if the user did not enter a title
        errors.title = "You must enter a title";
    }
    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
}

//Everytime you create a new form through the reduxForm call the form will store data attached to the streamCreate keyword

//how to combine reduxForm with Redux connect function
export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);

