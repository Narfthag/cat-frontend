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
            <div className="centered-login">
                <input onChange={this.handleChange} type="text" placeholder="Escriba su apodo" />
                <button onClick={this.onClick}>Ingresar</button>
            </div>
        );
    }

    onClick = () => {
        // Conexion a base de datos para obtener el user_id;
        this.props.onLogin(this.state.nickname);
    }

    handleChange = (evt) => {
        this.setState({ 'nickname' : evt.target.value });
    }
}

export default Login;
