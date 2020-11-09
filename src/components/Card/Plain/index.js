import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import s from '../style'
const index = (props) => {
  const { title, content, onPress } = props;
  return (
    
    <View  style={[s.card, {marginHorizontal:10}]} >
    <View style={{flexDirection: "column" }}>
        <Text>
          {title}
        </Text>
        <Text style={{fontFamily: 'NunitoSans-Bold'}}>{content}</Text>
    </View>
  </View>

  );
};
export default index;
