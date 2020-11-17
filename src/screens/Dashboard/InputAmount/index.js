import React from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';
import UserCard from '../../../components/Card/User';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {createPin} from '../../../redux/actions/user';
import {InputBorderless, InputBorderedBottom} from '../../../components/Input';
import {currency} from '../../../helpers';
const InputAmount = (props) => {
  const {key, id, photo, name, phone} = props.route.params;
  const [amount, setAmount] = React.useState('');
  const [note, setNote] = React.useState('');
  const { userdata } = useSelector(state => state.User)
  const [balance, setBalance] = React.useState(userdata.balance);
  const _onSubmit = () => {
    // dispatch(createPin(payload.token, pin, props));
    props.navigation.navigate('InputPin', {
      id: id,
      photo: photo,
      name: name,
      phone: phone,
      amount: amount,
      note: note,
    });
  };

  // const _changeAmount = (text) => {
  //   setAmount(text)
  //   // const temp = text
  //   // setBalance(balance-amount)
  // }
  return (
    <>
      <StatusBar backgroundColor={color.primary} barStyle="light-content" />
      <ScrollView style={s.page} keyboardShouldPersistTaps="always">
        <View
          style={{
            backgroundColor: color.primary,
            padding: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <UserCard key={key} photo={photo} name={name} phone={phone} />
        </View>
        <View style={{alignSelf: 'center'}}>
          <InputBorderless
            placeholder="0.00"
            onChange={(text)=> setAmount(text)}
            value={amount}
            style={{marginVertical: 20}}
            keyboard="number-pad"
          />
          <View style={{alignSelf:"center"}}>

          {balance ? (
            <Text>Rp. {currency(parseInt(balance-amount))} Avaliable</Text>
          ) : (
            <Text>Rp. 0 Avaliable</Text>
          )}
          </View>
          <View style={{margin: 30}}>
            <InputBorderedBottom
              icon="edit-2"
              placeholder="Add some notes"
              value={note}
              onChange={(text) => setNote(text)}
              style={{marginVertical: 10}}
            />
          </View>
        </View>
      </ScrollView>

      <Button
        uppercase={false}
        style={s.button100}
        mode="contained"
        disabled={ amount.length < 1 || note.length < 1? true : false}
        onPress={_onSubmit}>
        <Text style={{color: color.white}}>Continue</Text>
      </Button>
    </>
  );
};

export default InputAmount;
