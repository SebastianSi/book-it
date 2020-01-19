import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFound from "./NotFound";
import SearchPage from "./searchPage/SearchPage";
import AddTrainer from "./RegisterTrainerPage/AddTrainer";
import Dummy from "./RegisterTrainerPage/Dummy";

function fetchTrainersFromDb() {
    const url = 'http://localhost:5000/api/v2/trainers/';
    fetch(url)
        .then((resp) => resp.json())
        .then(function(response) {
            console.log('trainers from db: ', response)
        })
        .catch(function(error) {
            console.log(error);
        });
}

class App extends React.Component {

    componentDidMount() {
        fetchTrainersFromDb();
        toggleHeaderItemsActiveClass();
    }

    render() {
        return (
            <Router>
                <div className='App'>
                    <nav className='main-header'>
                        <ul className='main-header-list'>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/search">Search</Link>
                            </li>
                            <li>
                                <Link to="/register_as_trainer">Add Trainer</Link>
                            </li>
                            <li>
                                <Link to="/dummy">Dummy</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/search" exact>
                            <SearchPage />
                        </Route>
                        <Route path="/register_as_trainer" exact component={AddTrainer} />
                        <Route path="/dummy">
                            <Dummy />
                        </Route>
                        <Route component={NotFound}/>
                        {/*<Route path="/">*/}
                        {/*  <Home />*/}
                        {/*</Route>*/}
                    </Switch>
                </div>
            </Router>
        )
    }

}

function toggleHeaderItemsActiveClass() {

  const headerMenuItems = document.querySelector('.main-header-list');
  [...headerMenuItems.children].forEach((liNode)=> {
      liNode.onclick = function() {
          [...headerMenuItems.children].map( node => node.className = '');
          liNode.className = 'active';
      }
  })
}

export default App;
