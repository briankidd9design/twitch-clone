import React from 'react';
import ReactDOM from 'react-dom';
// import history from '../history';

const Modal = props => {
    //createPortal should be used when you want to render some React component into some HTML that was not create by your React app. 
    //An example would be to use React in a server-side rendered application like maybe a Java application that renders HTML on the back end..or maybe a Ruby on Rails application, Django or soemthing like that. 

    return ReactDOM.createPortal(
        //this is a semantic ui class name
        //first element for the createPortal will be some JSX and the second element will be a reference to where we want the JSX to appear, in this case the JSX depicts a Modal. 
        // <div onClick={() => history.push('/')} className="ui dimmer modals visible active">
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
        {/* this stops the even from bubbling up  */}
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
             </div>
        </div>,
        //second element
        document.querySelector("#modal")
    );
};

export default Modal;