// @flow
'use strict';

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Settings from './model/Settings';
import Player from './model/Player';

import Button from './util/Button';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

type Props = {
  settings : Settings;
  onSave : (settings: Settings) => void;
}

export default class MatchSettings extends Component {

  props : Props;
  state : {
    player1Name: string;
    player2Name: string;
  };

  constructor(props:Props) {
    super(props);
    this.state = {
      player1Name: this.props.settings.player1.name,
      player2Name: this.props.settings.player2.name
    };
  }

  saveSettings() {

    let settings : Settings = new Settings(
      new Player( this.state.player1Name, this.props.settings.player1.mark ),
      new Player( this.state.player2Name, this.props.settings.player2.mark )
    );

    this.props.onSave( settings );
  }

  render() {
    return (
      <View style={styles.matchSettings}>
        <View style={styles.matchSettingsHeader}>
          <Text style={styles.matchSettingsHeaderText}>Settings</Text>
        </View>
        <View style={{padding: 20}}>
          <PlayerInput label="Player 1" playerName={this.state.player1Name}
            iconName="user"
            inputProps={{
              onChangeText: (player1Name) => { this.setState({player1Name}) },
              onSubmitEditing: () => this.refs["2"].refs["fumi"].refs["input"].focus(),
              returnKeyType: 'next'
            }}/>
          <View style={{height:10}}/>
          <PlayerInput ref="2" label="Player 2" playerName={this.state.player2Name}
            iconName="user-o"
            inputProps={{
              onChangeText: (player2Name) => this.setState({player2Name}),
              onSubmitEditing: () => this.saveSettings(),
              returnKeyType: 'done'
            }}/>
          <View style={{height:10}}/>
          <View style={{alignItems: 'flex-end'}}>
            <Button onPress={()=>this.saveSettings()} text="Save"/>
          </View>
        </View>
      </View>
    );
  }
}

//Workaround for eventual bug in Fumi's component.
//https://github.com/halilb/react-native-textinput-effects/issues/15
class MyIcon extends FontAwesomeIcon {
  viewConfig = {};
}
class PlayerInput extends Component {

  props : {
    label : string;
    playerName : string;
    inputProps : any; // TODO: try to use a more specific type, instead of any
    iconName : string;
  };

  render() {
    return <Fumi
            ref="fumi"
            style={styles.matchSettingsPlayerInput}
            labelStyle={styles.matchSettingsPlayerLabel}
            label={this.props.label}
            value={this.props.playerName}
            {...this.props.inputProps}
            iconClass={MyIcon}
            iconName={this.props.iconName}
            iconColor={'#f95a25'}
            />;
  }
}

const styles = StyleSheet.create({
    matchSettings: {
      width: 300,
      backgroundColor: 'rgba(52,52,52,0.75)'
    },
    matchSettingsHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      borderWidth: 1,
      backgroundColor: '#ffd700',
    },
    matchSettingsHeaderText: {
      fontWeight: 'bold'
    },
    matchSettingsPlayerLabel: {
      fontFamily: 'serif',
      fontWeight: 'bold',
      color: '#1e90ff'
    },
    matchSettingsPlayerInput: {
      backgroundColor: 'rgba(252,252,252,0.75)'
    }
  });
