import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import s from '../style';
import color from '../../../styles/constant';
import {Button, IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {currency} from '../../../helpers';
import {getHistories} from '../../../redux/actions/user';
import {UserLoad} from '../../../redux/actions/user';
import Avatar from '../../../components/Avatar';
import HistoryCard from '../../../components/Card/History';
const Main = (props) => {
  const {token} = useSelector((state) => state.Auth);
  const {userdata, history, error} = useSelector((state) => state.User);
  const {name, balance, phone, email, photo} = userdata;

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(UserLoad(token));
    dispatch(getHistories(token));
  }, [dispatch, token]);

  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')} activeOpacity={0.8} style={s.menu}>
          <Avatar photo={photo} size={50}/>
          <View style={{flexDirection: 'column', marginLeft: 0}}>
            <Text>Hello,</Text>
            <Text style={s.bold}>{name}</Text>
          </View>
          <IconButton
            icon="bell-outline"
            size={30}
            style={{marginLeft: 'auto'}}
          />
        </TouchableOpacity>

        <View style={s.mainCard}>
          <Text style={s.textWhite}>Balance</Text>
          <Text style={s.textWhiteXl}>Rp {currency(parseInt(balance))}</Text>
          <Text style={s.textWhite}>{phone ? `+62 ${phone}` : '-'}</Text>
        </View>
        <View style={{flexDirection: 'row',justifyContent:"space-between", padding: 10}}>
          <Button
            icon="arrow-up"
            mode="contained"
            uppercase={false}
            color={color.grey}
            style={s.button50}
            labelStyle={{color: color.primary}}
            onPress={()=>props.navigation.navigate('Transfer')}
            >
            <Text style={{color: color.dark}}>Transfer</Text>
          </Button>
          <Button
            icon="plus"
            mode="contained"
            uppercase={false}
            color={color.grey}
            style={s.button50}
            labelStyle={{color: color.primary}}>
            <Text style={{color: color.dark}}>Top Up</Text>
          </Button>
        </View>
        <View
          style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 30}}>
          <Text>Transaction History</Text>
          <TouchableOpacity activeOpacity={0.8} style={{marginLeft: 'auto'}}
          onPress={()=>props.navigation.navigate('History')}>
            <Text style={{color: color.primary}}>See all</Text>
          </TouchableOpacity>
        </View>

        {!history.history.length ? (
          <TouchableOpacity style={[s.card, {alignSelf:"center"}]}>
            <Text>Data is empty</Text>
          </TouchableOpacity>
        ) : (
          history.history.map((item,index) => {
            return (
              <HistoryCard
              key={index}
                photo={item.photo}
                name={item.name}
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

export default Main;
