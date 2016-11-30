// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class Button extends Component {

  props : {
    text : string;
    onPress : () => void;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
  )};
}

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: '#f0e68c',
      width: 100,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      borderRadius: 10
    },
    buttonText: {
      fontSize: 20,
      fontFamily: 'serif',
      fontWeight: 'bold',
    },
  });
