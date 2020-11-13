import React from 'react';
import {ScrollView, View, Text, StatusBar, Dimensions} from 'react-native';
import UserCard from '../../../components/Card/User';
import PlainCard from '../../../components/Card/Plain';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getHistoryId} from '../../../redux/actions/user';
import {currency} from '../../../helpers';
import SvgUri from 'react-native-svg-uri';
const InputAmount = (props) => {
  const {id, photo, name, phone, amount, note, idHistory} = props.route.params;
  const { token } = useSelector(state => state.Auth)
  const { historyId, userdata } = useSelector(state => state.User)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getHistoryId(token, idHistory))
  }, [dispatch, id, token])
  const _onSubmit = () => {
    // dispatch(createPin(payload.token, pin, props));
    props.navigation.navigate('Main');
  };
  // const _changeAmount = text => {
  //   setAmount(text.replace(/[^0-9]/g, ''))
  //   text = "Rp" + currency(text.replace(/[^0-9]/g, ''))
  // }
  return (
    <>
      <StatusBar backgroundColor={color.primary} barStyle="light-content" />
      <ScrollView style={s.page} keyboardShouldPersistTaps="always">
        <View
          style={{
            backgroundColor: color.primary,
            padding: 30,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text style={{fontSize: 18, color: color.white, textAlign: 'center'}}>
            Transfer Details
          </Text>
        </View>
        <View style={{alignSelf: 'center', marginVertical: 30}}>
          <SvgUri
            width={Dimensions.get('screen').width - 200}
            height={Dimensions.get('screen').height / 7}
            source={require('../../../assets/img/success-circle.svg')}
          />
          <Text
            style={{
              fontFamily: 'NunitoSans-Bold',
              textAlign: 'center',
              marginVertical: 20,
            }}>
            Transfer Success
          </Text>
        </View>

        <PlainCard title="Amount" content={amount ? <Text>Rp {currency(parseInt(amount))}</Text> : null} />
        <PlainCard title="Balance Left" content={userdata.balance ? <Text>Rp {currency(parseInt(userdata.balance))}</Text> : null} />
        <PlainCard title="Date & Time" content={historyId ? new Date(historyId?.created_at).toDateString() : null} />
        <PlainCard title="Notes" content={note ? note : null} />
        <UserCard photo={photo} name={name} phone={phone} />
      </ScrollView>

      <Button
        uppercase={false}
        style={s.button100}
        mode="contained"
        onPress={_onSubmit}>
        <Text style={{color: color.white}}>Back To Home</Text>
      </Button>
    </>
  );
};

export default InputAmount;
