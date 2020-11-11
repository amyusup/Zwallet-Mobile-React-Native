import React from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';
import {InputPinBorder} from '../../../components/Input';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { createPin } from '../../../redux/actions/user'
const CreatePin = (props) => {
  const [pin, setPin] = React.useState('');
  const dispatch = useDispatch()
  const { payload } = useSelector(state => state.Auth)

  const _onSubmit = () => {
    dispatch(createPin(payload.token, pin, props))
  }
  return (
    <>
    <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
    <ScrollView  style={s.page} keyboardShouldPersistTaps='always'>
    <Text style={[s.brand]}>ZWALLET</Text>
    <View style={[s.radiusTop, s.card]}>
      <Text style={s.title}>Create Security PIN</Text>
      <Text style={[s.subTitle]}>
      Create a PIN that’s contain 6 digits number for security purpose in Zwallet.
        </Text>
        <InputPinBorder
            length={6}
            onChangeText={(text)=>setPin(text)}
            style={{marginVertical:20}}
        />
         </View>
      
    </ScrollView>
       <Button
          uppercase={false}
          style={s.button}
          mode="contained"
          disabled={pin.length< 6 ? true:false}
          onPress={_onSubmit}

          >
          <Text style={{color:color.white}}>Confirm</Text>
        </Button>
    </>
  );
};

export default CreatePin;
