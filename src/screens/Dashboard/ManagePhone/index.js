import React from 'react';
import {StatusBar, ScrollView, Text, View, Dimensions} from 'react-native';
import s from '../style';
import color from '../../../styles/constant';
import PlainCard from '../../../components/Card/Plain';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {deletePhone} from '../../../redux/actions/user';
const index = (props) => {
  const {token} = useSelector((state) => state.Auth);
  const {userdata} = useSelector((state) => state.User);
  const {phone} = userdata;
  const dispatch = useDispatch();
  const _onDelete = async () => {
    dispatch(deletePhone(token, props));
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page}>
        <Text style={{marginHorizontal: 15}}>
          You can only delete the phone number and then you must add another
          phone number.
        </Text>

        <PlainCard
          title={
            <View style={{flexDirection: 'row'}}>
              <Text>Primary</Text>
              <TouchableOpacity  style={{marginLeft:Dimensions.get("screen").width /1.5}} onPress={_onDelete}>
                <Icons name="trash" color={color.dark} size={20} />
              </TouchableOpacity>
            </View>
          }
          content={phone?`+62 ${phone}`:" - "}
        />
      </ScrollView>
    </>
  );
};
export default index;
