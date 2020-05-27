import React, {Component} from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickname: ''
        }
    }

    render(){
        return (
            <div class="centered-login">
                <input type="text" placeholder="nickname" value={this.state.nickname}></input>
                <button>Sign In</button>
            </div>
        );
    }

    onClick = () => {
        // Conexion a base de datos para obtener el user_id.
        
    }
}

export default Login;
