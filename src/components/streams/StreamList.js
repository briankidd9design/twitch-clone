// import { times } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

// const StreamList = () => {
//     return <div>StreamList</div>
// };
class StreamList extends React.Component {
  //the list of streams will be fetched one time
  componentDidMount() {
    this.props.fetchStreams();
  }
  //the two buttons are like administrative buttons
  renderAdmin(stream) {
    //if the stream ID is associated with the current logged in user then render the Edit/Delete
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* <button className="ui button primary">Edit</button> */}
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
          Delete</Link>
        </div>
      );
    }
  }
  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
          {/* this path has to be used in the App.js Route path */}
          <Link to={`/streams/${stream.id}`} className="header">
            {stream.title}
          </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right " }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }
  render() {
    // return <div>StreamList</div>;
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
          {this.renderCreate()}
        </div>
      </div>
    );
  }
}
//list of streams is actually stored in an object
//
const mapStateToProps = (state) => {
  //all of the different object values are going to be pulled out and inserted into an array.
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};
// export default StreamList;
export default connect(mapStateToProps, { fetchStreams })(StreamList);
