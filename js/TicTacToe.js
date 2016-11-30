// @flow
'use strict';

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';

import Settings from './model/Settings';
import Player from './model/Player';
import GameResult from './model/GameResult';

import Icon from 'react-native-vector-icons/FontAwesome';

import BoardRow from './BoardRow';
import Square from './Square';

import Button from './util/Button';

import MatchSettings from './MatchSettings';
import AnimatedLine from './util/AnimatedLine';

type State = {
    player : number;
    matrix : Array<Array<string>>;
    gameResult : GameResult;
    modalVisible : boolean;
    settings : Settings;
    settingsVisible : boolean;
}

export default class TicTacToe extends Component {

  state : State;

  winnerLinePosition : {
    direction : string;
    value : number;
  };

  constructor() {
    super();
    this.state = this._getInitialState( true );
  }

  _getInitialState( resetSettings:boolean ) : State {

    let _settings : Settings;

    if( resetSettings ) {
      _settings = new Settings(
        new Player('Player 1', 'X'),
        new Player('Player 2', 'O')
      );
    } else {
      _settings = this.state.settings;
    }

    let _state : State = {
      player: 1,
      matrix: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      gameResult: new GameResult(null,false),
      modalVisible: false,
      settings: _settings,
      settingsVisible: resetSettings
    };

    return _state;
  }

  restartGame() : void {
    this.setState(
      this._getInitialState( false )
    );
  }

  insertMark(row : number, column : number) :void {

    this.state.matrix[row][column] = ( ( this.state.player == 1 ) ? 'X' : 'O' ); // TODO: refactor to avoid mutating state.

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

  checkEndGame( cb:()=>void ) : void {
    let winner : ?Player = this.checkWinner();
    let tie : boolean = ( !winner && !this.hasAvailableSpaces() );

    this.setState( { gameResult : new GameResult( winner, tie) }, cb );
  }

  hasAvailableSpaces() : boolean {
    let hasAvailableSpaces : boolean = false;
    this.state.matrix.some(
      ( row : Array<string> ) => {
        row.some(
          ( column : string ) => {
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

  // TODO: refactor to make it a pure function, i.e., has no side effects, like assigning value to winnerLinePosition.
  checkWinner() : ?Player {
    let winner : ?Player = null;
    for(let i :number = 0; i < 3; i++) {
        //check rows
        winner = this.checkTripletResult(this.state.matrix[i][0], this.state.matrix[i][1], this.state.matrix[i][2]);
        if( winner != null ) {
          this.winnerLinePosition = {
            direction: "horizontal",
            value: i
          };
          break;
        }

        //check columns
        winner = this.checkTripletResult(this.state.matrix[0][i], this.state.matrix[1][i], this.state.matrix[2][i]);
        if( winner != null ) {
          this.winnerLinePosition = {
            direction: "vertical",
             value: i
          };
          break;
        }

    }

    if( winner == null ) {
      //check diagonals
      winner = this.checkTripletResult(this.state.matrix[0][0], this.state.matrix[1][1], this.state.matrix[2][2]);
      if( winner != null ) {
        this.winnerLinePosition = {
          direction: "diagonal",
          value: 0
        };
      } else {
        winner = this.checkTripletResult(this.state.matrix[0][2], this.state.matrix[1][1], this.state.matrix[2][0]);
        if( winner != null ) {
          this.winnerLinePosition = {
            direction: "diagonal",
            value: 1
          };
        }
      }
    }

    return winner;
  }

  checkTripletResult(mark0:string, mark1:string, mark2:string) : ?Player {
    let rowResult : string = mark0 + mark1 + mark2;
    if( rowResult == 'XXX' || rowResult == 'OOO' ) {
      return this.state.settings.getPlayerByMark( mark0 );
    } else {
      return null;
    }
  }

  getWinnerLine() : any {
    if( !this.state.gameResult.winner ) {
      throw new Error("this.state.gameResult.winner must not bu null");
    }

    if( !this.winnerLinePosition ) {
      throw new Error("this.winnerLinePosition must not bu null");
    }

    let style :any = {
      position: 'absolute',
      top: undefined,
      left: undefined,
      marginLeft: undefined,
      backgroundColor: ( this.state.gameResult.winner.mark == 'X' ? '#2f4f4f' : '#f0e68c' )
    };

    if( this.winnerLinePosition.direction=='horizontal') {
      style.marginLeft = 10;
      style.top = [147,308,468][ this.winnerLinePosition.value ];
      return <AnimatedLine style={style} direction="horizontal" maxWidth={350}/>;
    } else if( this.winnerLinePosition.direction=='vertical') {
      style.top = 80;
      style.left = [81,204,327][ this.winnerLinePosition.value ];
      return <AnimatedLine style={style} direction="vertical" maxHeight={450}/>;
    } else {
      // TODO: draw diagonal line.
      console.log('TODO: draw line through diagonal #' + this.winnerLinePosition.value.toString());
      return null;
    }
  }

  render() {
    let winnerLine = ( this.state.gameResult.winner != null ) ? this.getWinnerLine() : null;
    let gameOver :boolean = this.state.gameResult.gameOver();

    let rows : Array<any> = this.state.matrix.map(
      (squares, rowIndex) => <BoardRow key={rowIndex} squares={squares} gameOver={gameOver} onSquarePress={(squareIndex)=>this.insertMark(rowIndex,squareIndex)}/>
    );

    return (
      <View style={{flex: 1}}>
        <Modal style={{alignItems: 'center', justifyContent: 'center'}} animationType={"slide"} transparent={true}  onRequestClose={()=>{}} visible={this.state.settingsVisible}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <MatchSettings settings={this.state.settings} onSave={(newSettings)=>{ this.setState( {
              settings: newSettings,
              settingsVisible: false } ) }}/>
          </View>
        </Modal>
        <Modal style={{alignItems: 'center', justifyContent: 'center'}} animationType={"slide"} transparent={true} visible={this.state.modalVisible} onRequestClose={()=>{}} >
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View style={{width: 360, height: 175, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52,52,52,0.75)', }}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(252,252,252,0.4)'}}>Game Over!</Text>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'rgba(252,252,252,0.4)'}}>{
                this.state.gameResult.gameOver() && ( this.state.gameResult.winner ? 'Winner: ' + this.state.gameResult.winner.name : 'Tie!' )}</Text>
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

class Footer extends Component {

  props : {
    player : string;
    onPressRestart : () => void;
  };

  render() {
    return (
      <View style={styles.footer}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Player: {this.props.player}</Text>
        <Button onPress={this.props.onPressRestart} text="Restart" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: '#008b8b'
    },
    header: {
      padding: 10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: '#ffd700'
    },
    board: {
      flex: 20,
      justifyContent: 'space-between',
      backgroundColor: 'blue'
    },
    footer: {
      padding: 10,
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
