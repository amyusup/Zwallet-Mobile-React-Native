import React from 'react';
import {StatusBar, ScrollView, Text, View, Dimensions} from 'react-native';
import s from '../style';
import color from '../../../styles/constant';
import PlainCard from '../../../components/Card/Plain';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
const index = (props) => {
  const {userdata} = useSelector((state) => state.User);
  const {name, email, phone} = userdata;
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page}>
        <Text style={{marginHorizontal: 15}}>
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </Text>
        {name ? (
          name.match(' ') ? (
            <>
              <PlainCard
                title="First Name"
                content={
                  name
                    ? name.split(' ').slice(0, name.split(' ').length - 1)
                    : null
                }
              />
              <PlainCard
                title="Last Name"
                content={
                  name ? name.split(' ')[name.split(' ').length - 1] : null
                }
              />
            </>
          ) : (
            <PlainCard title="Name" content={name ? name : null} />
          )
        ) : null}
        <PlainCard title="Verified E-mail" content={email ? email : null} />
        <PlainCard
          title={
              <View style={{flexDirection: 'row'}}>
                  <Text>Phone Number</Text>
                  <TouchableOpacity
                  style={{marginLeft:Dimensions.get("screen").width /2.5}}
                  onPress={() => {
                      phone?
                      props.navigation.navigate('ManagePhone')
                      :
                      props.navigation.navigate('AddPhone')
                  }
                  }>
                  <Text style={{color: color.primary}}>Manage</Text>
                </TouchableOpacity>
              </View>
          }
          content= { phone ? `+62 ${phone}`: " - "} 
        />
      </ScrollView>
    </>
  );
};
export default index;
