import React from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';
import {InputPinBorder} from '../../../components/Input';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { balanceTransfer } from '../../../redux/actions/user'
const InputPin = (props) => {
  const [pin, setPin] = React.useState('');
  const {  id,photo, name, phone, amount, note } = props.route.params;
  const date = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.Auth)
 

  const _onSubmit = async () => {
    const data = { id, note, pin, total: amount }
    dispatch(balanceTransfer(token, data, props))
    // props.navigation.navigate("TransferStatus",{
    //   id: id,
    //   photo: photo,
    //   name: name,
    //   phone: phone ,
    //   amount:amount,
    //   notes:notes
    // })
  }
  return (
    <>
    <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
    <ScrollView  style={s.page} keyboardShouldPersistTaps='always'>
    <View style={{ marginHorizontal:10}}>
      <Text style={{color:color.dark, marginVertical:30}}>
      Enter your 6 digits PIN for confirmation to continue transferring money. 
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
          style={s.button100}
          mode="contained"
          disabled={pin.length< 6 ? true:false}
          onPress={_onSubmit}

          >
          <Text style={{color:color.white}}>Transfer Now</Text>
        </Button>
    </>
  );
};

export default InputPin;
