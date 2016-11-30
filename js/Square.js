// @flow
'use strict';

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Square extends Component {

  //TODO: define properties (mark, gameOver, onPress)

  render() {
    let markStyle = ( this.props.mark == 'X' ) ? styles.markX : styles.markY;

    return (
      <TouchableHighlight disabled={this.props.gameOver || this.props.mark != ''} style={styles.square} onPress={this.props.onPress}>
          <Text style={[styles.mark, markStyle]}>{this.props.mark}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    square: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: '#008b8b'
    },
    mark: {
      fontSize: 100,
      fontWeight: 'bold'
    },
    markX: {
      color: '#2f4f4f'
    },
    markY: {
      color: '#f0e68c'
    },
  });
