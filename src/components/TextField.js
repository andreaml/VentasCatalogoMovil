import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

class TextField extends Component {
  render() {
    return(
      <View style={[styles.inputContainer]}>
        <TextInput {...this.props} ref={input => {this.input = input}} />
        <Text style={{marginBottom: 2}}>{this.props.error}</Text>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginVertical: 5,
  }
})

export default TextField