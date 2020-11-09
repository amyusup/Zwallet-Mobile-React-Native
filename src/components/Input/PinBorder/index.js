import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import color from '../../../styles/constant';
 
const {width} = Dimensions.get('window');
 
const PinBorder = (props) => {
  const {length, onChangeText, style} = props;
  const inputLength = React.useState(Array(length).fill(''))[0];
  const createRef = [];
 
  const _handleInput = (key, text) => {
    let currentIndex = key;
    inputLength[key] = text;
 
    if (text.length === 1 && key < length - 1) {
      currentIndex += 1;
      createRef[currentIndex].focus();
    }
 
    const pinString = inputLength.join('');
    onChangeText(pinString);
  };
 
  const _handleDelete = (key, event) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (key > 0) {
        createRef[key - 1].focus();
      }
    }
  };
 
  return (
    <View style={styles.inputContainer}>
      {inputLength.map((val, key) => {
        const active = val ? color.primary : color.grey;
 
        return (
          <View key={key} style={[styles.inputView, {borderColor: active},style]}>
            <TextInput
              ref={(input) => (createRef[key] = input)}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(text) => _handleInput(key, text)}
              onKeyPress={(e) => _handleDelete(key, e)}
              style={[styles.inputText, {color: color.dark}]}
            />
          </View>
        );
      })}
    </View>
  );
};
 
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: width / 50,
    paddingVertical: 4,
  },
  inputText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});
 
export default PinBorder;