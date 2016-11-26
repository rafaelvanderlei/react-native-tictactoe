import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import { styles } from './styles';

export default class Square extends Component {

  //TODO: define properties (mark, gameOver, onPress)

  render() {
    let markStyle = ( this.props.mark == 'X' ) ? styles.markX : styles.markY;

    return (
      <TouchableHighlight disabled={this.props.gameOver || this.props.mark != ''} style={styles.Square} onPress={this.props.onPress}>
          <Text style={[styles.mark, markStyle]}>{this.props.mark}</Text>
      </TouchableHighlight>
    );
  }
}
