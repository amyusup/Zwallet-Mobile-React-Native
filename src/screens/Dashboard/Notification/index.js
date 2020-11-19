import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import color from '../../../styles/constant';
import s from '../style';
import NotificationCard from '../../../components/Card/Notification';
import {useSelector, useDispatch} from 'react-redux';
import {getHistories} from '../../../redux/actions/user';
const index = (props) => {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(2);

  const {token} = useSelector((state) => state.Auth);
  const {userdata, history, error} = useSelector((state) => state.User);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getHistories(token, 1,5));
    setLoading(false);
  }, [dispatch, token]);

  const loadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOffset(offset + 1);
      dispatch(getHistories(token, offset, 5, false));
    }, 1500);
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page} onScrollEndDrag={loadMore}>
        {!history.history.length ? (
          <TouchableOpacity style={s.card}>
            <Text style={{alignSelf: 'center'}}>Data is empty</Text>
          </TouchableOpacity>
        ) : (
          history.history.map((item, index) => {
            return (
              <NotificationCard
                key={index}
                name={item.type === 'transfer' ? item.name_receiver : item.va_type}
                isIncome={item.is_income}
                amount={
                  item.type === 'transfer' ? item.amount : item.amount_topup
                }
              />
            );
          })
        )}
        {loading ? (
          <View style={{alignSelf: 'center'}}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={{marginVertical: 20}}></View>
        )}
      </ScrollView>
    </>
  );
};
export default index;
