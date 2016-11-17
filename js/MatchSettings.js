import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { styles } from './styles';

export default class MatchSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player1: {
        name: 'Insert player 1 name'
      },
      player2: {
        name: 'Insert player 2 name'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      //TODO optimize to check is columns actually changed
      { columns: nextProps.columns }
    );
  }


  render() {

    let columns = this.state.columns.map(
      (columnMark, columnIndex) => <BoardColumn key={columnIndex} row={this.props.row} column={columnIndex} mark={columnMark} appState={this.props.appState} onPress={this.props.onPress} />
    );

    return (
      <View style={styles.matchSettings}>
        <TextInput editable={true} maxLength={40} value={this.state.player1.name} />
        <TextInput editable={true} maxLength={40} value={this.state.player2.name} />
      </View>
    );
  }
}
