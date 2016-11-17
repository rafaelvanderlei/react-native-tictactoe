import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Navigator,
  Modal
} from 'react-native';

import BoardRow from './BoardRow';
import BoardColumn from './BoardColumn';

import { styles } from './styles';

import MatchSettings from './MatchSettings';

export default class TicTacToe extends Component {

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _getInitialState() {
    return {
      player: 1,
      matrix: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      gameResult: new GameResult('',false),
      modalVisible: false,
    };
  }

  restartGame() {
    this.setState(
      this._getInitialState()
    );
  }

  insertMark(i,j,mark) {
    this.state.matrix[i][j] = mark;
    this.setState(
      { matrix: this.state.matrix }
    );
    this.checkEndGame(

    ()=> {
      if( this.state.gameResult.gameOver() ) {
      this.setState(
        { modalVisible: true }
      );
    } else {
      this.setState( { player : ( this.state.player == 1 ? 2 : 1 ) } );
    }
  }
  );
    console.log(this.state);
  }

  checkEndGame(cb) {
    let winner = this.checkWinner();
    if( winner == '' ) {
      //check tie
      if( ! this.hasAvailableSpaces() ) {
        this.setState( {gameResult : new GameResult('', true) }, cb );
      }

      cb();
    } else {
      this.setState( { gameResult : new GameResult(winner, false) }, cb );
    }
  }

  hasAvailableSpaces() {
    let hasAvailableSpaces = false;
    this.state.matrix.some(
      ( row ) => {
        row.some(
          ( column ) => {
            if( column == '') {
              hasAvailableSpaces = true;
              return true;
            }
          }
        )

        if( hasAvailableSpaces ) {
          return true;
        }
      }
    );

    return hasAvailableSpaces;
  }

  checkWinner() {
    let winner = '';
    for(let i = 0; i < 3; i++) {
        //check rows
        winner = this.checkTripletResult(this.state.matrix[i][0], this.state.matrix[i][1], this.state.matrix[i][2]);
        if( winner != '') {
          break;
        }

        //check columns
        winner = this.checkTripletResult(this.state.matrix[0][i], this.state.matrix[1][i], this.state.matrix[2][i]);
        if( winner != '') {
          break;
        }

    }

    if( winner == '' ) {
      //check diagonals
      winner = this.checkTripletResult(this.state.matrix[0][0], this.state.matrix[1][1], this.state.matrix[2][2]);
      if( winner == '' ) {
        winner = this.checkTripletResult(this.state.matrix[0][2], this.state.matrix[1][1], this.state.matrix[2][0]);
      }
    }

    return winner;
  }

  checkTripletResult(item0, item1, item2) {
    let rowResult = item0+item1+item2;
    if( rowResult == 'XXX' || rowResult == 'OOO' ) {
      return item0;
    } else {
      return '';
    }
  }

  render() {

    let horizontalLine =
    false
    // ( this.state.mark == 'X' )
    ? <View style={{flex: 1, alignSelf: 'stretch', position: 'absolute', top: 70, left: 0, right: 0, height: 5, backgroundColor: '#e0ffff'}} />
    : null;

    let verticalLine =
    false
    // ( this.state.mark == 'O' )
    ? <View style={{flex: 1, alignSelf: 'stretch', position: 'absolute', top: 0, bottom: 0, left: 53, width: 5, backgroundColor: '#e0ffff'}} />
    : null;

    let rows = this.state.matrix.map(
      (rowColumns, rowIndex) => <BoardRow key={rowIndex} row={rowIndex} columns={rowColumns} appState={this.state} onPress={this.insertMark.bind(this)}/>
    );

    return () <MatchSettings /> );
/*
    return (
      <View style={{flex: 1}}>
        <Modal style={{alignItems: 'center', justifyContent: 'center'}} animationType={"slide"} transparent={true} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}} >
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <View style={{width: 360, height: 175, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52,52,52,0.75)', }}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(252,252,252,0.4)'}}>Game Over!</Text>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(252,252,252,0.4)'}}>{( this.state.gameResult.tie ? 'Tie!' : 'Winner: ' + this.state.gameResult.winner )}</Text>
          <TouchableOpacity style={{padding: 10}} onPress={() => { this.setState( { modalVisible: false } ) }}>
            <View style={styles.restartButtonContainer}>
              <Text style={styles.restartButtonText}>OK</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
        </Modal>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tic Tac Toe</Text>
            </View>
            <View style={styles.board}>
              {rows}
            </View>
            <Footer player={this.state.player} onPressRestart={this.restartGame.bind(this)}/>
            {horizontalLine}
            {verticalLine}
          </View>
      </View>
    );*/
  }
}

class GameResult {
  winner = '';
  tie = false;

  constructor(winner, tie) {
    this.winner = winner;
    this.tie = tie;
  }

  gameOver() {
    return ( this.winner != '' || this.tie );
  }
}

class Footer extends Component {

  render() {
    return (
      <View style={styles.footer}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Player: {this.props.player}</Text>
        <TouchableOpacity onPress={this.props.onPressRestart}>
          <View style={styles.restartButtonContainer}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
