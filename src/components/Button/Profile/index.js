import React from 'react';
import {TouchableOpacity, Text } from 'react-native';
import {IconButton, Switch  } from 'react-native-paper';
import color from '../../../styles/constant'

const index = (props) => {
    const {onPress, text, icon, withSwitch, style} = props
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <TouchableOpacity activeOpacity={0.8}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.white,
      margin: 10,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal:20,
      elevation:5
    }}
    onPress={onPress}
    >
    <Text style={[{fontFamily:"NunitoSans-Bold"},style]}>{text}</Text>
    <IconButton
      icon={icon}
      color={color.dark}
      size={20}
      style={{marginLeft:"auto"}}
    />
    {withSwitch?<Switch color={color.primary} value={isSwitchOn} onValueChange={onToggleSwitch} /> : null}
    
  </TouchableOpacity>
  );
};
export default index;
