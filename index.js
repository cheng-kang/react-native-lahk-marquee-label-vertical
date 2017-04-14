import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

export default class MarqueeTextVertical extends Component {
  state = {
    started: false // use state for this variable to make sure that any change would affect UI
  };

  componentWillMount() {
    this.animatedTransformY = new Animated.Value(0);
    this.bgViewHeight = 0;
    this.textHeight = 0;
    this.duration = 0;

    this.shouldFinish = false;
  }

  componentWillUnmount() {
    this.shouldFinish = true;
  }

  textOnLayout(e) {
    this.textHeight = e.nativeEvent.layout.height;

    if (this.bgViewHeight !== 0) {
      this.prepareToAnimate()
    }
  }

  bgViewOnLayout(e) {
    this.bgViewHeight = e.nativeEvent.layout.height;

    if (this.textHeight !== 0) {
      this.prepareToAnimate()
    }
  }

  prepareToAnimate() {
    // Calculate this.duration by this.props.duration / this.props.speed
    // If this.props.duration is set, discard this.props.speed
    const { duration, speed } = this.props;
    if (duration !== undefined) {
      this.duration = duration;
    } else if (speed !== undefined) {
      this.duration = ((this.bgViewHeight + this.textHeight) / speed) * 1000;
    }
    this.animate();
  }

  animate() {
    this.animatedTransformY.setValue(this.bgViewHeight);
    if (!this.state.started) {
      this.setState({
        started: true
      });
    }
    Animated.timing(this.animatedTransformY, {
        toValue: -this.textHeight,
        duration: this.duration,
        useNativeDriver: true,
        easing: Easing.linear
    }).start(() => {
      if (!this.shouldFinish) {
        this.animate()
      }
    });
  }

  render() {
    const { 
      children, 
      text,
      bgViewStyle, // Backgound View Custom Styles
      textStyle, // Text Custom Styles
    } = this.props;

    const { started } = this.state;

    return (
      <View 
        style={{ ...styles.bgViewStyle, ...bgViewStyle }}
        onLayout={(event) => this.bgViewOnLayout(event)}
      >
        <Animated.Text 
          style={{
            transform: [{ translateY: this.animatedTransformY }],
            opacity: started ? 1 : 0,
            ...styles.textStyle,
            ...textStyle
          }}
          onLayout={(event) => this.textOnLayout(event)}
        >
          {children || text || ' '}
        </Animated.Text>
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
  }
};