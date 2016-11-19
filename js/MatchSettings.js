import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

import { styles } from './styles';
import Button from './util/Button';

export default class MatchSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Name: this.props.appState.settings.player1.name,
      player2Name: this.props.appState.settings.player2.name
    };
  }

  saveSettings() {
    this.props.onSave(this.state.player1Name, this.state.player2Name);
  }

  render() {
    return (
      <View style={styles.matchSettings}>
        <View style={styles.matchSettingsHeader}>
          <Text style={styles.matchSettingsHeaderText}>Settings</Text>
        </View>
        <View style={{padding: 20}}>
          <PlayerInput label="Player 1" playerName={this.state.player1Name}
            inputProps={{
              placeholder: "Insert player 1 name",
              onChangeText: (player1Name) => { this.setState({player1Name}) },
              onSubmitEditing: () => this.refs["2"].refs["input"].focus(),
              returnKeyType: 'next'
            }}/>
          <PlayerInput ref="2" label="Player 2" playerName={this.state.player2Name}
            inputProps={{
              placeholder: "Insert player 2 name",
              onChangeText: (player2Name) => this.setState({player2Name}),
              onSubmitEditing: () => this.saveSettings(),
              returnKeyType: 'done'
            }}/>
          <View style={{alignItems: 'flex-end'}}>
            <Button onPress={()=>this.saveSettings()} text="Save"/>
          </View>
        </View>
      </View>
    );
  }
}

class PlayerInput extends Component {
  render() {
    return(
      <View>
        <Text style={styles.matchSettingsPlayerLabel}>{this.props.label}</Text>
        <TextInput
          style={styles.matchSettingsPlayerInput}
          value={this.props.playerName}
          placeholderTextColor='#add8e6'
          ref="input"
          {...this.props.inputProps}
          />
      </View>

    );
  }
}
