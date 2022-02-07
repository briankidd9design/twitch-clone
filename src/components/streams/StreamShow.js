import React from "react";
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
//flv downloads the video stream and converting it to some file that can be played inside of a html player. flv.js is like Axios in that it is going to reach out to some remote server get some resource and then serve out that data to our application to be consumed on the screen
import flv from 'flv.js';

//The process:
//1. The ID out of the url must be read
//2. An Action Creator must be called to fetch the particlar stream
//3. Use a mapStateToProps function to get that stream out of the Redux Store and into the component
class StreamShow extends React.Component {
    constructor(props){
        super(props)
        //This ref will be passed on to the video we created in the render method
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        // this.props.fetchStream(this.props.match.params.id);
        //this will take care of the case of loading the page and not having access to the actual stream
        this.props.fetchStream(id);
        //when the component first renders, attempt to build the player
        this.buildPlayer();
    }

    componentDidUpdate() {
        //if the component fetches the stream sometime and the component re-renders componentDidUpdate will be called and we will attempt to builPlayer in that lifecycle method as well.
        this.buildPlayer();
    }

    componentWillUnmount() {
        // console.log("I was unmounted");
        //stop playing video when the component is unmounted
        //this tells the player to stop attempting to stream video
        //and detatch itself from the video element that is created in the builPlayer() helper method
        this.player.destroy();
    }

    buildPlayer() {
        //if the player has been set up OR if the stream does not yet exist
       
        const { id } = this.props.match.params;
        if (this.player || !this.props.stream) {
            return;
        }
        //when our component is unmounted from the DOM, when we navigate away from the StreamShow component, there is no code that tells the video player to stop streaming video from the video server
         //even though we are no longer looking at the actual video player the video player is still attempting to download and process video.
         //This creates the MediaSource onSourceEnded console log
         //The player is still connect to the stream and trying to receive new information
        this.player = flv.createPlayer({
            //pass in the options object
            //flv is the type of video the app will be receiving
            type: 'flv',
            //the stream name is the actual stream name the person creates in OBS
            // url: `http://localhost:8000/live/STREAM_NAME.flv`
            //the id is the id of the video stream
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

  render() {
      if(!this.props.stream){
        return <div>Loading...</div>
      }
      const { title, description } = this.props.stream;
        return (
            <div>
                {/* <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5> */}
                <video ref={this.videoRef} style={{ width: '100%' }} controls/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
  }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps, { fetchStream })(StreamShow);