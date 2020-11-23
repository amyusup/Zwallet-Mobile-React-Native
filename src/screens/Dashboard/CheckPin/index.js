import React from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';
import {InputPinBorder} from '../../../components/Input';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {checkPin} from '../../../redux/actions/user';
const index = (props) => {
  const [pin, setPin] = React.useState('');
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.Auth);

  const _onSubmit = () => {
    dispatch(checkPin(token, pin, props));
  };

  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page} keyboardShouldPersistTaps="always">
        <View style={{marginHorizontal: 10}}>
          <Text style={{color: color.dark, marginVertical: 30}}>
            Enter your current 6 digits Zwallet PIN below to continue to the
            next steps.
          </Text>
          <InputPinBorder
            length={6}
            onChangeText={(text) => setPin(text)}
            style={{marginVertical: 20}}
          />
        </View>
      </ScrollView>

      <Button
        uppercase={false}
        style={s.button100}
        mode="contained"
        disabled={pin.length < 6 ? true : false}
        onPress={_onSubmit}>
        <Text style={{color: color.white}}>Continue</Text>
      </Button>
    </>
  );
};

export default index;
