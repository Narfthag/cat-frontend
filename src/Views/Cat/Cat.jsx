import React, {Component} from 'react';
import Board from './Board.jsx';
import Message from './Message.jsx';
import SimpleCat from './simpleCat.js';
import './Cat.css'

class Cat extends Component {
    constructor(props) {
        super(props);

        const ENGINE = new SimpleCat();

        this.state = { 
            engine: ENGINE,
            board: ENGINE.board,
            player_turn: true,
            not_ended: true,
            message: {
                value: '',
                type: 2
            }
        }
    }
    render() { 
        return ( 
            <div className="cat-screen">
                <Board onClick={this.onClickBoard} board={this.state.board}></Board>
                <Message type={this.state.message.type} message={this.state.message.value}/>
            </div> 
            );
    }



    onClickBoard = (col, row) => {
        const { engine, player_turn, not_ended } = this.state;
        
        const new_state = {
            engine: this.state.engine,
            board: this.state.board,
            player_turn: this.state.player_turn,
            message: {
                value: this.state.message.value,
                type: this.state.message.type
            },
            not_ended: this.state.not_ended
        }

        if(not_ended){
            let status = engine.isGoodMove(col, row);
            if(status.status !== 1){
                new_state.message.type = -1;
                new_state.message.value = status.error_message;
            } else {
                if(player_turn){
                    // Llamamos la funci'on que se va a encargar del turno de jugador de X.
                    this.firstPlayerTurn(col, row, new_state);
                } else {
                    // Llamamos la funci'on que se va a encargar del turno de jugador de Y.
                    this.secondPlayerTurn(col, row, new_state);
                }
                if( new_state.not_ended ){
                    new_state.player_turn = !new_state.player_turn;
                    new_state.not_ended = engine.notEnded;
                }
                new_state.board = engine.board;
                
            }
        } else {
            new_state.message.type = -1;
            new_state.message.value = "El juego ya termino";
        }
        this.setState(new_state); 
    }

    firstPlayerTurn = (col, row, state) => {
        const {engine} = this.state;
        engine.firstPlayerTurn(col, row);
        if( engine.didFirstPlayerWin() ){
            state.message.type = 1;
            state.message.value = "Gano el Jugador que lleva las X";
            state.not_ended = false;
        } else {
            state.message.type = 0;
            state.message.value = "Le toca al Jugador que lleva las O";
        }

    }

    secondPlayerTurn = (col, row, state) => {
        const {engine} = this.state;
        engine.secondPlayerTurn(col, row);
        if( engine.didSecondPlayerWin() ){
            state.message.type = 1;
            state.message.value = "Gano el Jugador que lleva las O";
            state.not_ended = false;
        } else {
            state.message.type = 0;
            state.message.value = "Le toca al Jugador que lleva las X";
        }
    }

}
 
export default Cat;