import React, {Component} from 'react';
import Board from './Board.jsx';
import Message from './Message.jsx';
import SimpleCat from './simpleCat.js';
import socketIOClient from "socket.io-client";
import './Cat.css'

const ENDPOINT = "http://localhost:5000";

const socket = socketIOClient(ENDPOINT);

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
            }, 
            noWait: false
        }   
    }


    componentDidMount = () => {
        socket.emit('auth', { 'u_id': this.props.data.user_id, 'type': this.props.type });
        socket.on('status-update', this.statusUpdateHandler);
        socket.on('new-match', this.newMatchHandler);
        socket.on('play-move', this.playMove);
        socket.on('unlock', this.unlockState)
    }

    componentWillUnmount = () => {
        socket.off('status-update');
        socket.off('new-match');
    }

    unlockState = (data) => {
        console.log(data);
        this.setState({
            message: {
                value: data.message,
                type: 1
            },
            noWait: !(data.wait)
        });
    }

    playMove = (data) => {
        const {player_turn} = this.state;
        const {col, row} = data;
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

        if(player_turn){
            this.firstPlayerTurn(col, row, new_state);
        } else {
            this.secondPlayerTurn(col, row, new_state);
        }
        new_state.player_turn = ! player_turn;
        this.setState(new_state);
    }

    statusUpdateHandler = (status) => {
        this.setState({
            message: {
                value: status.message,
                type: 1
            },
            noWait: !(status.wait)
        })
    }

    newMatchHandler = (data) => {
        this.setState({
            message: {
                value: data.message,
                type: 1
            },
            noWait: !(data.wait)
        })
        this.props.changeRoom(data.matchRoom);
    }


    render() { 

        return ( 
            <div className="cat-screen">
                { ( this.props.data.match_room !== null ) ? 
                    <div><strong>Room:</strong> {this.props.data.match_room}</div> :
                    <div><strong>Room:</strong> </div> }
                <Board onClick={this.onClickBoardWs} board={this.state.board}></Board>
                <Message type={this.state.message.type} message={this.state.message.value}/>
            </div> 
            );
    }

    onClickBoardWs = (col, row) => {
        const {engine, not_ended, noWait } = this.state;
        if(not_ended && noWait){
            let goodMove = engine.isGoodMove(col, row);
            if(goodMove.status !== 1){
                this.setState({
                    message: {
                        message: {
                            value: goodMove.error_message,
                            type: -1
                        }
                    }
                })
            } else {
                this.setState({
                    noWait: !(this.state.noWait)
                })
                socket.emit('turn-player', {
                    'room': this.props.data.match_room ,
                    'col': col, 
                    'row': row, 
                    'player': this.props.data.user_id
                })
            }
           
        }
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