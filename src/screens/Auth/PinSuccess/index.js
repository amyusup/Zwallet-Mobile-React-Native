import React from 'react';
import {ScrollView, View, Text, Dimensions, StatusBar} from 'react-native';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import SvgUri from 'react-native-svg-uri';
const PinSuccess = (props) => {
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page} keyboardShouldPersistTaps='always'>
        <Text style={[s.brand]}>ZWALLET</Text>
        <View style={[s.radiusTop, s.card]}>
          <View style={{alignSelf: 'center', marginBottom: 20}}>
            <SvgUri
              width={Dimensions.get('screen').width - 200}
              height={Dimensions.get('screen').height / 7}
              source={require('../../../assets/img/success-circle.svg')}
            />
          </View>

          <Text style={s.title}>PIN Successfully Created</Text>
          <Text style={[s.subTitle, {marginVertical: 10}]}>
            Your PIN was successfully created and you can now access all the
            features in Zwallet. Login to your new account and start exploring!
          </Text>
          <Button
            uppercase={false}
            style={s.button}
            mode="contained"
            onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={{color: color.white}}>Sign In Now</Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default PinSuccess;
