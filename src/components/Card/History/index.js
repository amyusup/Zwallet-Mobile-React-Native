import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Avatar from '../../Avatar'
import {currency} from '../../../helpers';
import s from '../style'
const index = (props) => {
  const {photo, name, type, isIncome, amount} = props;
  return (
    
    <TouchableOpacity activeOpacity={0.8} style={s.card}>
    <View style={{flexDirection: 'row', alignItems:"center"}}>
      <Avatar photo={photo} size={50} />
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontFamily: 'NunitoSans-Bold'}}>
          {name}
        </Text>
        <Text>{type}</Text>
      </View>
      <View style={{marginLeft: 'auto'}}>
        <Text
          style={
            isIncome
              ? s.textSuccess
              : s.textDanger
          }>
          {isIncome ? '+' : '-'} Rp{' '}
          {currency(amount)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>

  );
};
export default index;
