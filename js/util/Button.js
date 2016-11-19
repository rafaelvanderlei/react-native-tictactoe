import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { styles } from '../styles';

export default class Button extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
  )};
}
