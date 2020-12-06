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
import UserCard from '../../../components/Card/User';
import {useSelector, useDispatch} from 'react-redux';
import {getFindUsers} from '../../../redux/actions/user';
import {InputBordered} from '../../../components/Input';
import Icons from 'react-native-vector-icons/Feather';
const index = (props) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setMore] = useState(true);
  const [offset, setOffset] = useState(2);

  const {token} = useSelector((state) => state.Auth);
  const {findUser, error} = useSelector((state) => state.User);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFindUsers(token, 1, name));
  }, [dispatch, name, token]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOffset(offset + 1);
      dispatch(getFindUsers(token, offset, name, false));
    }, 1500);
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={[s.page, {height:'100%'}]} onScrollEndDrag={() => loadMore()}>
        <View style={{marginHorizontal: 20}}>
          <InputBordered
            icon="search"
            placeholder="Search receiver here"
            value={name}
            onChange={(text) => setName(text)}
            style={{marginVertical: 10}}
          />
        </View>

        {!findUser.length ? (
          <TouchableOpacity style={s.card}>
            <Text style={{alignSelf: 'center'}}>Data is empty</Text>
          </TouchableOpacity>
        ) : (
          findUser.map((item, index) => {
            return (
              <UserCard
                key={index}
                photo={item.photo}
                name={item.name}
                phone={item.phone ? `+62 ${item.phone}` : '-'}
                cardPress={() =>
                  props.navigation.navigate('InputAmount', {
                    key: index,
                    id: item.id,
                    photo: item.photo,
                    name: item.name,
                    phone: item.phone ? `+62 ${item.phone}` : '-',
                  })
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
