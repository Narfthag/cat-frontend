import React, {Component} from 'react';
import './App.css';
// import './Views/Login/Login.js';
import Cat from './Views/Cat/Cat';


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
    return ( 
      <div className="App">
        <Cat></Cat>
      </div> 
    );
  }

  handleLogin = (nickname, user_id) => {

  }
}
 
export default App;
