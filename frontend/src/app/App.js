import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFound from "./NotFound";
import SearchPage from "./searchPage/SearchPage";

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/search" exact>
              <SearchPage />
            </Route>
            <Route component={NotFound}/>
            {/*<Route path="/">*/}
            {/*  <Home />*/}
            {/*</Route>*/}
          </Switch>
        </div>
      </Router>
  );
}

export default App;
