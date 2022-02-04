import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    //or if you want to be cooler about it
    // state = { isSignedIn: null}
    // constructor(props){
    //     super(props)
        //we do not know if the user is signed in or not signed in when the application loads.
    //     this.state = { isSignedIn: null }
    // }
    componentDidMount() {
        //include the window object so the app know that it is available on the window object
        //We need to get a callback for when the process of getting the data from the Google server is complete
        //This whole process just initializes the library
        //It does not take the user throught the OAuth process
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                client_id: '325401719252-ig3jokh6te7ucm32fcet86hho7tj47uu.apps.googleusercontent.com',
                scope: 'email'
                //then will be executed when gapi is ready
                //Determine whether the user is signed in and print out that status
            }).then(()=>{
                //sign the user in or out or get their authentication status
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.onAuthChange(this.auth.isSignedIn.get() );
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
//Because this is a callback function, this is set up as an arrow function so that it's context is bound to the component
//Anytime the authentic status changes, the onAuthChange method will be called
    onAuthChange = (isSignedIn) => {
        //gets called with a boolean argument to indicate whether or not the user is signed in
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        if (isSignedIn) {
            //when we call the action creator, we are also passing the user id for the person who has signed in.
            this.props.signIn(this.auth.currentUser.get().getId());
            console.log(`this is the userID ${this.auth.currentUser.get().getId()}`);
        } else {
            this.props.signOut();
        }
    };

    //Helper methods are nice because they help describe what is going on inside of a component.
    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
            //the state is now handled with the reducers. 
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick}className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return(
                //Do not put parenthesis on the callback because that means the callback will be called the moment the component is rendered to the screen. No Bueno
            <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon"/>
            Sign In with Google
        </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton() }</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut}) (GoogleAuth);
