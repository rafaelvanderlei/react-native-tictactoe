import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import { styles } from './styles';

export default class BoardColumn extends Component {

  constructor (props) {
    super(props);
    this.state = {
      mark : this.props.mark,
    };
  }

  toggleMark() {

    if( this.state.mark == '' ) {
      let newMark = ( this.props.appState.player == 1 ) ? 'X' : 'O';
      this.props.onPress( this.props.row, this.props.column, newMark );
    }

  }

  markColor() {
    return ( this.state.mark == 'X' ) ? null : { color: '#f0e68c' };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      //TODO optimize to check is columns actually changed
      { mark: nextProps.mark }
    );
  }

  render() {
    return (
      <TouchableHighlight disabled={this.props.appState.gameResult.gameOver() || this.state.mark != ''} style={styles.boardColumn} onPress={this.toggleMark.bind(this)}>
          <Text style={[styles.mark, this.markColor()]}>{this.state.mark}</Text>
      </TouchableHighlight>
    );
  }
}
