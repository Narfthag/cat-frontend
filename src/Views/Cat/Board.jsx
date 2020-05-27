import React, {Component} from 'react';
import Cell from './Cell';

class Board extends Component {

    render(props) { 
        let first_row  = this.createRow(0, this.props.board[0]);
        let second_row = this.createRow(1, this.props.board[1]);
        let third_row  = this.createRow(2, this.props.board[2]);
        return ( 
            <div className="board-cat">
                {first_row}
                {second_row}
                {third_row}
            </div>
        );
    }

    createRow = ( row_n , arr ) => {
        return (
            <div className="cat-row">
                <Cell value={arr[0]} col={0} row={row_n} handleClick={this.props.onClick} ></Cell>
                <Cell value={arr[1]} col={1} row={row_n} handleClick={this.props.onClick} ></Cell>
                <Cell value={arr[2]} col={2} row={row_n} handleClick={this.props.onClick} ></Cell>
            </div>
        )
    }
}
 
export default Board;