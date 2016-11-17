/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TicTacToe from './js/TicTacToe';

export default class TicTacToeApp extends Component {
  render() {
    return (
      <TicTacToe />
    );
  }
}

AppRegistry.registerComponent('tictactoe', () => TicTacToeApp);
