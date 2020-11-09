import React from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';
import {InputBorderenBottom} from '../../../components/Input';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
const ForgotPassword = (props) => {
  const [email, setEmail] = React.useState('')
  const _onSubmit = () => {
    props.navigation.navigate('CreatePassword')
  }
  return (
    <>
    <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
    <ScrollView style={s.page} keyboardShouldPersistTaps='always'>
      <Text style={[s.brand]}>ZWALLET</Text>
      <View style={[s.radiusTop, s.card]}>
        <Text style={s.title}>Reset Password</Text>
        <Text style={[s.subTitle]}>
          Enter your Zwallet e-mail so we can send you a password reset link.
        </Text>
        <InputBorderenBottom
          icon="mail"
          placeholder="Enter your e-mail"
          value={email}
          onChange={(text) => setEmail(text)}
          style={{marginVertical: 10}}
        />
        <Button
          uppercase={false}
          style={s.button}
          mode="contained"
          onPress={_onSubmit}
          >
          <Text style={{color: color.white}}>Confirm</Text>
        </Button>
      </View>
    </ScrollView>
    </>
  );
};

export default ForgotPassword;
