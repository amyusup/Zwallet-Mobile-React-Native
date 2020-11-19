import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {currency} from '../../../helpers';
import s from '../style';
import Icon from 'react-native-vector-icons/Feather';
import color from '../../../styles/constant';
const index = (props) => {
  const { name, isIncome, amount} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} style={s.card}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isIncome ? (
          <Icon name="arrow-down" size={30} color={color.success} />
        ) : (
          <Icon name="arrow-up" size={30} color={color.danger} />
        )}
        <View style={{flexDirection: 'column', marginLeft:10}}>
          {isIncome ? (
            <Text>Transfer from {name}</Text>
          ) : (
            <Text>Transfer To {name}</Text>
          )}

          <Text style={{fontFamily: 'NunitoSans-Bold'}}>
            Rp. {currency(amount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default index;
