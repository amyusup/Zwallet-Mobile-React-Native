import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import color from '../../../styles/constant';
import s from '../style';
import HistoryCard from '../../../components/Card/History';
import {useSelector, useDispatch} from 'react-redux';
import {getHistories} from '../../../redux/actions/user';
import {currency} from '../../../helpers';
import Icons from 'react-native-vector-icons/Feather';
const index = (props) => {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(2);

  const {token} = useSelector((state) => state.Auth);
  const {userdata, history, error} = useSelector((state) => state.User);
  const { name, photo } = userdata

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getHistories(token, 1));
    setLoading(false);
  }, [dispatch, token]);

 

  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate('Main')}
          style={[
            s.mainCard,
            {flexDirection: 'row', justifyContent: 'space-around'},
          ]}>
          <View>
            <Icons name="arrow-down" color={color.success} size={30} />
            <Text style={[s.textWhite, {marginVertical: 5}]}>Income</Text>
            <Text style={s.textWhite}>Rp{currency(history?.income)}</Text>
          </View>
          <View>
            <Icons name="arrow-up" color={color.danger} size={30} />
            <Text style={[s.textWhite, {marginVertical: 5}]}>Expense</Text>
            <Text style={s.textWhite}>Rp{currency(history?.expense)}</Text>
          </View>
          {/* <Text style={s.textWhiteXl}>Rp {currency(parseInt(balance))}</Text> */}
          {/* <Text style={s.textWhite}>{phone ? `+62 ${phone}` : '-'}</Text> */}
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 30}}>
          <Text>Transaction History</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginLeft: 'auto'}}
            onPress={() => props.navigation.navigate('History')}>
            <Text style={{color: color.primary}}>See all</Text>
          </TouchableOpacity>
        </View>
        {!history.history.length ? (
          <TouchableOpacity style={s.card}>
            <Text style={{alignSelf: 'center'}}>Data is empty</Text>
          </TouchableOpacity>
        ) : (
          history.history.map((item, index) => {
            return (
              <HistoryCard
                key={index}
                photo={item.photo_receiver == photo ? item.photo:item.photo_receiver}
                name={item.type === 'transfer' ? (item.name_receiver==name?item.name:item.name_receiver) : item.va_type}
               
                type={item.type}
                isIncome={item.is_income}
                amount={
                  item.type === 'transfer' ? item.amount : item.amount_topup
                }
              />
            );
          })
        )}
      </ScrollView>
    </>
  );
};
export default index;
