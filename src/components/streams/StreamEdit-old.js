import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions'

//StreamEdit Component has access to the props object
//That props object knows about the ID of the stream that we are trying to show
//Props object is only accessible inside of StreamEdit function
class StreamEdit extends React.Component {
    componentDidMount( ){
        this.props.fetchStream(this.props.match.params.id);
    }
    render() {
    if (!this.props.stream) {    
        return (
            <div>Loading...</div>  
            )
        }
        return <div>{this.props.stream.title}</div>
    }
};

//mapStateToProps knows about the list of streams that is stored inside of the state object
const mapStateToProps = (state, ownProps) => {
    
    return{ stream: state.streams[ownProps.match.params.id] };
};


// export default connect(mapStateToProps) (StreamEdit);
export default connect(mapStateToProps, {fetchStream})(StreamEdit);