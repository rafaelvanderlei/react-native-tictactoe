import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import BoardColumn from './BoardColumn';

import { styles } from './styles';

export default class BoardRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns
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
      <View style={styles.boardRow}>
        {columns}
      </View>
    );
  }
}
