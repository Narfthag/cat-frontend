import React, {Component} from 'react';
import './App.css';
import Login from './Views/Login/Login.jsx';
import Cat from './Views/Cat/Cat.jsx';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      nickname: 'nickname',
      user_id: null,
      match_room: null
    }
  }
  render() {
    const loggedIn = this.state.user_id !== null;
    return ( 
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/play/public"/> : <Redirect to="/login"/>}
            </Route>
            <Route path="/login">
              {loggedIn ? <Redirect to="/play/public"/> : <Login onLogin={this.handleLogin}/>}
            </Route>
            <Route path="/play/private">
              {loggedIn ? <Cat changeRoom={this.changeRoom} type="private" data={this.state}/> : <Redirect to="/login/"/>}
            </Route>
            <Route path="/play/public">
              {loggedIn ? <Cat changeRoom={this.changeRoom} type="public" data={this.state}/> : <Redirect to="/login/"/>}
            </Route>
          </Switch> 
        </div>
      </Router>
    );
  }

  changeRoom = (room) => {
    this.setState({'match_room': room});
  }

  handleLogin = (nickname) => {
    let response;
    console.log(nickname);
    axios.post('http://localhost:5000/login', {
      'nick': nickname
    }).then((response) => {
      console.log(response.data);
      this.setState({'nickname': nickname, 'user_id': response.data.uuid});
    }, error => {
      console.log(error);
    });

    return response;
  }
}
 
export default App;
