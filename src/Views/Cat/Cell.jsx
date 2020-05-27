import React, {Component} from 'react';


class Cell extends Component {
    render(props) { 
        return ( <button onClick={this.onClick}>{ this.props.value }</button> );
    }

    onClick = (props) => {
        this.props.handleClick( this.props.row, this.props.col );
    }
}
 
export default Cell;