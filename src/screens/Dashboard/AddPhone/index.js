import React from 'react';
import {StatusBar, ScrollView, Text, View, Dimensions} from 'react-native';
import s from '../style';
import color from '../../../styles/constant';
import {InputBorderenBottom} from '../../../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import { addPhone } from '../../../redux/actions/user'
import {Button} from 'react-native-paper';
const index = (props) => {
  const {token} = useSelector((state) => state.Auth);
  const [phone, setPhone] = React.useState('+62 ');
  const dispatch = useDispatch();
  const _onSubmit = async () => {
    
    dispatch(addPhone(token, phone.split(" ")[1], props))
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page} style={s.page} keyboardShouldPersistTaps='always'>
        <View style={{marginHorizontal: 15}}>
          <Text>
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </Text>
          <InputBorderenBottom
            icon="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(text) => setPhone(text)}
            style={{marginVertical: 10}}
          />
         
        </View>
        <Button
            disabled={phone < 4 ? true : false}
            uppercase={false}
            style={[s.button100]}
            mode="contained"
            onPress={_onSubmit}>
            <Text style={{color: color.white}}>Submit</Text>
          </Button>
      </ScrollView>
    </>
  );
};
export default index;
