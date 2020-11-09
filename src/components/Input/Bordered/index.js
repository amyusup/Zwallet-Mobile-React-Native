import React from 'react';
import {TextInput, View, Dimensions, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import color from '../../../styles/constant';
const index = (props) => {
  const {placeholder, value, onChange, icon,style, ...input} = props;
  const [onFocus, setFocus] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const {width} = Dimensions.get('screen');

  const styles = StyleSheet.create({
    input:{
      flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderRadius:10,
        backgroundColor:color.grey,
        overflow: 'hidden',
        paddingHorizontal:10
    }
  })
  return (
    <View
      style={[style,styles.input]}>
      <Icons
        name={icon}
        color={onFocus || value != ""  ? color.primary : color.dark}
        size={width / 18}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocus(!onFocus)}
        onBlur={() => setFocus(!onFocus)}
        secureTextEntry={show ? false : input.secureTextEntry}
        style={{
          width: input.secureTextEntry ? '80%' : '100%',
        }}
      />

      {input.secureTextEntry ? (
        <Icons
          name="eye-off"
          color={show ? color.primary : color.grey}
          size={width / 16}
          onPress={() => setShow(!show)}
        />
      ) : null}
    </View>
  );
};

export default index;
