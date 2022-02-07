import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      {/* The only change is that we now have control over the history object since we are now longer using BrowserRouter */}
      <Router history={history}>
        <div>
          <Header />
          {/* The Switch prvents stream/new showing with the streams/:id */}
          <Switch>
          {/* react-router-dom is going to only show the first route of a given path. So once it finds /steams/new it will not look for any other potential routs since the "/:id acts as a variable" */}
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            {/* the colon actually turns it into a variable of sorts and id can be any word actually */}
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

// const PageOne = () => {
//     return (
//         <div>
//             PageOne
//             {/* BAD!!! */}
//             {/* <a href="/pagetwo">Navigate to Page Two</a> */}
//             {/* GOOD!!!! */}
//             {/* <Link to="/pagetwo">Navigate to Page Two</Link> */}
//         </div>
//     );
// }

// const PageTwo = () => {
//     return(
//         <div>
//          PageTwo
//             <button>Click Me!</button>
//             {/* BAD!!! */}
//             {/* <a href="/">Navigate to Page One</a> */}
//             <Link to="/">Navigate to Page One</Link>
//         </div>
//     );
// }
// //Different routes can be matched by the same URL
// const App = () => {
//     // return <div>App</div>
//     return (
//         <div>
//             <BrowserRouter>
//                 <div>
//                 {/* the exact keyword alleviates this problem */}
//                     <Route path="/" exact component={PageOne} />
//                     {/* written like below it will show both PageOne and PageTwo */}
//                     {/* <Route path="/" component={PageOne} /> */}
//                     <Route path="/pagetwo" component={PageTwo} />
//                 </div>
//             </BrowserRouter>
//         </div>
//     )
// };

export default App;
