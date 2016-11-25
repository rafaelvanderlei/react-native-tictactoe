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

import Icon from 'react-native-vector-icons/FontAwesome';

import BoardRow from './BoardRow';
import BoardColumn from './BoardColumn';

import { styles } from './styles';
import Button from './util/Button';

import MatchSettings from './MatchSettings';
import AnimatedLine from './util/AnimatedLine';

export default class TicTacToe extends Component {

  constructor(props) {
    super(props);
    this.winnerLinePosition = {};
    this.state = this._getInitialState( true );
  }

  _getInitialState( resetSettings=false ) {
    let _state = {
      player: 1,
      matrix: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      gameResult: new GameResult(null,false),
      modalVisible: false,
      // settings: this.state.settings
    };

    if( resetSettings ) {
      _state.settings = {
        player1: {
          name: 'Player 1',
          mark: 'X'
        },
        player2: {
          name: 'Player 2',
          mark: 'O'
        }
      }
      _state.settingsVisible = true;
    }

    return _state;
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
  }

  checkEndGame( cb ) {
    let winner = this.checkWinner();
    let tie = ( winner == null && !this.hasAvailableSpaces() );

    this.setState( { gameResult : new GameResult( winner, tie) }, cb );
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
    let winner = null;
    for(let i = 0; i < 3; i++) {
        //check rows
        winner = this.checkTripletResult(this.state.matrix[i][0], this.state.matrix[i][1], this.state.matrix[i][2]);
        if( winner != null ) {
          this.winnerLinePosition = {
            horizontal: i
          };
          break;
        }

        //check columns
        winner = this.checkTripletResult(this.state.matrix[0][i], this.state.matrix[1][i], this.state.matrix[2][i]);
        if( winner != null ) {
          this.winnerLinePosition = {
            vertical: i
          };
          break;
        }

    }

    if( winner == null ) {
      //check diagonals
      winner = this.checkTripletResult(this.state.matrix[0][0], this.state.matrix[1][1], this.state.matrix[2][2]);
      if( winner != null ) {
        this.winnerLinePosition = {
          diagonal: 0
        };
      } else {
        winner = this.checkTripletResult(this.state.matrix[0][2], this.state.matrix[1][1], this.state.matrix[2][0]);
        if( winner != null ) {
          this.winnerLinePosition = {
            diagonal: 1
          };
        }
      }
    }

    return winner;
  }

  checkTripletResult(item0, item1, item2) {
    let rowResult = item0+item1+item2;
    if( rowResult == 'XXX' || rowResult == 'OOO' ) {
      return (
        ( mark ) => {
          if( mark == this.state.settings.player1.mark ) {
            return this.state.settings.player1;
          }
          return this.state.settings.player2;
        }
      )( item0 );
    } else {
      return null;
    }
  }

  getWinnerLine() {
    let style = { position: 'absolute' };
    style.backgroundColor = this.state.gameResult.winner.mark == 'X' ? '#2f4f4f' : '#f0e68c';

    if( this.winnerLinePosition.horizontal != null ) {
      style.marginLeft = 10;
      style.top = [147,308,468][ this.winnerLinePosition.horizontal ];
      return <AnimatedLine style={style} direction="horizontal" maxWidth={350}/>;
    } else if( this.winnerLinePosition.vertical != null ) {
      style.top = 80;
      style.left = [81,204,327][ this.winnerLinePosition.vertical ];
      return <AnimatedLine style={style} direction="vertical" maxHeight={450}/>;
    } else {
      console.log('TODO: draw line through diagonal #' + this.winnerLinePosition.diagonal);
      return null;
    }


  }

  render() {

    let winnerLine = ( this.state.gameResult.winner != null ) ? this.getWinnerLine() : null;

    let rows = this.state.matrix.map(
      (rowColumns, rowIndex) => <BoardRow key={rowIndex} row={rowIndex} columns={rowColumns} appState={this.state} onPress={this.insertMark.bind(this)}/>
    );

    return (
      <View style={{flex: 1}}>
        <Modal style={{alignItems: 'center', justifyContent: 'center'}} animationType={"slide"} transparent={true}  onRequestClose={()=>{}} visible={this.state.settingsVisible}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <MatchSettings appState={this.state} onSave={(player1Name, player2Name)=>{ this.setState( {
              settings: {
                player1: { name: player1Name, mark: this.state.settings.player1.mark },
                player2: { name: player2Name, mark: this.state.settings.player2.mark },
              },
              settingsVisible: false } ) }}/>
          </View>
        </Modal>
        <Modal style={{alignItems: 'center', justifyContent: 'center'}} animationType={"slide"} transparent={true} visible={this.state.modalVisible} onRequestClose={()=>{}} >
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View style={{width: 360, height: 175, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52,52,52,0.75)', }}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(252,252,252,0.4)'}}>Game Over!</Text>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(252,252,252,0.4)'}}>{
                this.state.gameResult.gameOver() && ( this.state.gameResult.tie ? 'Tie!' : 'Winner: ' + this.state.gameResult.winner.name )}</Text>
              <View style={{padding:10}}>
                <Button style={{padding: 10}} onPress={() => { this.setState( { modalVisible: false } ) }} text="OK" />
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tic Tac Toe</Text>
            </View>
            <View style={{ position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center', height: 25}}>
              <TouchableOpacity onPress={ ()=>this.setState({ settingsVisible: true}) }>
                <Text style={{fontSize: 20, fontWeight: 'bold' }}><Icon name="wrench" size={20} /></Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.board}>
            {rows}
          </View>
          <Footer player={this.state.player == 1 ? this.state.settings.player1.name : this.state.settings.player2.name} onPressRestart={this.restartGame.bind(this)}/>
          {winnerLine}
        </View>
      </View>
    );
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
    return ( this.winner != null || this.tie );
  }
}

class Footer extends Component {

  render() {
    return (
      <View style={styles.footer}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Player: {this.props.player}</Text>
        <Button onPress={this.props.onPressRestart} text="Restart" />
      </View>
    );
  }
}
