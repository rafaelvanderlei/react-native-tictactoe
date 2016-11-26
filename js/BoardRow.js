import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Square from './Square';

import { styles } from './styles';

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
