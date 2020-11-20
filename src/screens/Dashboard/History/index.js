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
import Icons from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-paper';
const index = (props) => {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(2);
  const [orderBy, setOrderBy] = useState('');
  const [expense, setExpense] = useState(false);
  const [income, setIncome] = useState(false);
  const [notOrdered, setNotOrdered] = useState(false);

  const {token} = useSelector((state) => state.Auth);
  const {userdata, history, error} = useSelector((state) => state.User);
  const {photo, name} = userdata;

  const dispatch = useDispatch();

  useEffect(() => {
    // setupOrder();
    
    setLoading(true);
    dispatch(getHistories(token, 1, 4, true, orderBy));
    setLoading(false);

    // alert(`expense: ${expense}, income : ${income}`)
  }, [dispatch, token, expense, income, orderBy]);

  const loadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOffset(offset + 1);
      dispatch(getHistories(token, offset, 4, false, orderBy));
    }, 1500);
  };

  const setupOrder = () => {
    if(expense){
       setOrderBy('expense')
    }else if(income){
       setOrderBy('income')
    }
    if(!expense&&!income){
      setOrderBy('')
    }
    // expense
    //   ? setOrderBy('transfer')
    //   : income
    //   ? setOrderBy('topup')
    //   : !expense & !income
    //   ? setOrderBy('')
    //   : setOrderBy('');
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page}>
        <Text style={{marginLeft: 20, marginVertical: 20}}>
          Transaction History
        </Text>
        {!history.history.length ? (
          <TouchableOpacity style={s.card}>
            <Text style={{alignSelf: 'center'}}>Data is empty</Text>
          </TouchableOpacity>
        ) : (
          history.history.map((item, index) => {
            return (
              <HistoryCard
                key={index}
                photo={
                  item.photo_receiver == photo
                    ? item.photo
                    : item.photo_receiver
                }
                name={
                  item.type === 'transfer'
                    ? item.name_receiver == name
                      ? item.name
                      : item.name_receiver
                    : item.va_type
                }
                type={item.type}
                isIncome={item.is_income}
                amount={
                  item.type === 'transfer' ? item.amount : item.amount_topup
                }
              />
            );
          })
        )}
        {loading ? (
          <View style={{alignSelf: 'center', marginVertical: 20}}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={{alignSelf: 'center', marginVertical: 10}}>
            <Button
              mode="contained"
              uppercase={false}
              color={color.grey}
              style={s.button50}
              onPress={() => loadMore()}>
              <Text>Load More</Text>
            </Button>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: expense ? color.primary : color.white,
              padding: 10,
              elevation: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setExpense(!expense);
              setIncome(false);
              setOrderBy('expense')
            }}>
            <Icons name="arrow-up" color={color.danger} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: income ? color.primary : color.white,
              padding: 10,
              elevation: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setIncome(!income);
              setExpense(false);
              setOrderBy('income')
            }}>
            <Icons name="arrow-down" color={color.success} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.white,
              paddingVertical: 10,
              paddingHorizontal: 20,
              elevation: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: color.primary, fontFamily: 'NunitoSans-Bold'}}>
              Filter by Date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.white,
              padding: 10,
              elevation: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setIncome(false);
              setExpense(false);
              setOrderBy('')
            }}>
            <Icons name="trash" color={color.primary} size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default index;
