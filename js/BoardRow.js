// @flow
'use strict';

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Square from './Square';

export default class BoardRow extends Component {

  // TODO: define props (squares, gameOver, onSquarePress)

  render() {
    let squares = this.props.squares.map(
      (mark, squareIndex) => <Square key={squareIndex} mark={mark} gameOver={this.props.gameOver} onPress={()=>this.props.onSquarePress(squareIndex)} />
    );

    return (
      <View style={styles.boardRow}>
        {squares}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    boardRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: 'green'
    },
  });
