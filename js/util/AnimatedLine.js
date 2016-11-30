// @flow
'use strict';

import React, {
  Component
} from 'react';
import {
  Animated,
} from 'react-native';

type Props = {
  direction : "horizontal" | "vertical";
  maxWidth? : number;
  maxHeight? : number;
  style? : any;
};

export default class AnimatedLine extends Component {

  props : Props;

  state : {
    lineWidth?: Animated.Value;
    lineHeight?: Animated.Value;
  };

  // TODO: see how to declare conditionally required properties using Flow to eliminate the use of propTypes and avoid duplicated code.
  static propTypes = {
    direction : React.PropTypes.string.isRequired,
    maxWidth : function(props, propName, componentName) {
      if( 'direction' in props ) {
        if (props['direction'] == 'horizontal' && !(propName in props)) {
          throw new Error(propName + " must be set for direction='horizontal'.");
        }
      }
    },
    maxHeight : function(props, propName, componentName) {
      if( 'direction' in props ) {
        if (props['direction'] == 'vertical' && !(propName in props)) {
          throw new Error(propName + " must be set for direction='vertical'.");
        }
      }
    }
  }

  constructor(props:Props) {
    super(props);
    if( this.props.direction == 'horizontal' ) {
      this.state = {
        lineWidth: new Animated.Value(0),
      };
    } else {
      this.state = {
        lineHeight: new Animated.Value(0),
      };
    }
  }

  render() {
    let line = null;

    if( this.props.direction == 'horizontal' ) {
      let lineWidth = this.state.lineWidth && this.state.lineWidth.interpolate(
        {
          inputRange: [0, 1],
          outputRange: [0, this.props.maxWidth]
        }
      );

      line = <Animated.View style={[{ backgroundColor: 'black', height: 5, width: lineWidth},this.props.style]}/> ;
    } else {
      let lineHeight = this.state.lineHeight && this.state.lineHeight.interpolate(
        {
          inputRange: [0, 1],
          outputRange: [0, this.props.maxHeight]
        }
      );

      line = <Animated.View style={[{ backgroundColor: 'black', height: lineHeight, width: 5},this.props.style]}/>;
    }

    return line;
  }

  componentDidMount() {
    if ( this.props.direction == 'horizontal' ) {
      Animated.timing(
        this.state.lineWidth,
        {
          toValue: 1,
          duration: 500,
        }
      ).start();
    } else {
      Animated.timing(
        this.state.lineHeight,
        {
          toValue: 1,
          duration: 500,
        }
      ).start();
    }
  }
}
