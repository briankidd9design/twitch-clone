import React from "react";
import Modal from "../Modal";
import { connect } from 'react-redux';
import history from "../../history";
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
// const StreamDelete = () => {
//we need to make sue of the life cycle method componentDidMount()
class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
//call a life cycle method that will attempt to call the ActionCreator to go and fetch the stream that we are trying to delete
//every component that gets rendered by React DOM must attempt to fetch it's own data

//We cannot assume that the stream has already been loaded up

  //the below JSX will render the buttons
  //we cannot assign multiple JavaScript elements to a single variable so we need the <div> tag.
  renderActions() {
    // const id = this.props.match.params.id;
    //destructure that puppy --
    const { id } = this.props.match.params;
      return (
    // const actions = (
      // <div>
      //     <button className="ui button negative">Delete</button>
      //     <button className="ui button">Cancel</button>
      //  </div>
      //Return multiple elements but not have some presents inside the DOM
    
      <React.Fragment>
      {/* An action creator should reach out to the API and delete the particular stream */}
        <button onClick = {() => this.props.deleteStream(id) } className="ui button negative">Delete</button>
        {/* <button className="ui button">Cancel</button> */}
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
      );
    // );
  }
  renderContent() {
      if(!this.props.stream){
          return "Are you sure you want to delete this stream?"
      }

      return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
  }
    render() {
    return (
      <div>
        {/* StreamDelete */}
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}
//We want own props so that we can look at the props.match and pull out the ID that is to be shown on the page when the user clicks delete
const mapStateToProps = (state, ownProps) => {
    //state.streams is an object of all the streams we have loaded up
    return {stream: state.streams[ownProps.match.params.id]}
}
//mapStateToProps will allow you to use props in the renderContent() method above
export default connect(mapStateToProps, { fetchStream, deleteStream }) (StreamDelete);
