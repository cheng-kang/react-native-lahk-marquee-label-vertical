import React, { Component } from 'react';
import { View, Animated, Easing, Text } from 'react-native';

export default class MarqueeLabelVertical extends Component {
  state = {
    textWidth: 0,
    textHeight: 0,
    bgViewHeight: 0,
    duration: 0,
    text: '',
    animation: null
  };

  componentWillMount() {
    this.setState({
      text: this.props.text || this.props.children || ''
    })
    this.animation = null
    this.animatedTransformY = new Animated.Value(0);
  }

  componentWillUnmount() {
    if (this.state.animation !== null) {
      this.state.animation.stop();
    }
  }

  componentWillReceiveProps(nextProps) {
    let newText = nextProps.text || nextProps.children || '';
    let oldText = this.props.text || this.props.children || '';
    if (newText !== oldText) {
      this.state.animation.stop();
      this.setState({
        text: newText,
        textWidth: 0,
        textHeight: 0,
        duration: 0,
        animation: null
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { textHeight, bgViewHeight, duration, animation } = this.state;

    if (duration === 0) {
      if (textHeight === 0 || bgViewHeight === 0) { return }

      const { duration, speed } = this.props;
      if (duration !== undefined) {
        this.setState({
          duration: duration
        });
      } else if (speed !== undefined) {
        this.setState({
          duration: ((bgViewHeight + textHeight) / speed) * 1000
        });
      }
    } else {
      if (animation === null) {
        this.animatedTransformY.setValue(bgViewHeight);
        this.setState({
          animation: Animated.timing(this.animatedTransformY, {
            toValue: -textHeight,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear
          })
        })
      } else {
        animation.start(() => {
          this.setState({
            animation: null
          })
        });
      }
    }
  }

  textOnLayout(e) {
    this.setState({
      textWidth: e.nativeEvent.layout.width,
      textHeight: e.nativeEvent.layout.height
    });
  }

  bgViewOnLayout(e) {
    this.setState({
      bgViewHeight: e.nativeEvent.layout.height
    });
  }

  render() {
    const { 
      bgViewStyle, // Backgound View Custom Styles
      textStyle, // Text Custom Styles, e.g. {textAlign: 'center'}
    } = this.props;

    const { text, animation } = this.state;

    return (
      <View 
        style={{ ...styles.bgViewStyle, ...bgViewStyle }}
        onLayout={(event) => this.bgViewOnLayout(event)}
      >
        <Animated.Text 
          style={{
            transform: [{ translateY: this.animatedTransformY }],
            opacity: animation !== null ? 1 : 0,
            ...styles.textStyle,
            ...textStyle
          }}
        >
          {text}
        </Animated.Text>
        <Text
          style={{
            ...styles.textSizeMeasuringViewStyle,
            ...textStyle
          }}
          onLayout={(event) => this.textOnLayout(event)}
        >
          {text}
        </Text>
      </View>
    );
  }
}

const styles = {
  bgViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'scroll',
    paddingLeft: 20,
    paddingRight: 20
  },
  textStyle: {
    width: '100%'
  },
  textSizeMeasuringViewStyle: {
    opacity: 0,
    fontSize: 20
  }
};
