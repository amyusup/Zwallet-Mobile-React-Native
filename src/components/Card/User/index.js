import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Avatar from '../../Avatar'
import s from '../style'
const index = (props) => {
  const {photo, name, phone, cardPress } = props;
  return (
    
    <TouchableOpacity activeOpacity={0.8} style={s.card} onPress={cardPress}>
    <View style={{flexDirection: 'row', alignItems:"center"}}>
      <Avatar photo={photo} size={50} />
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontFamily: 'NunitoSans-Bold'}}>
          {name}
        </Text>
        <Text>{phone}</Text>
      </View>
    </View>
  </TouchableOpacity>

  );
};
export default index;
