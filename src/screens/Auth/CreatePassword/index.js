import React from 'react';
import {ScrollView, View, Text, StatusBar} from 'react-native';
import {InputBorderedBottom} from '../../../components/Input';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ForgotPassword} from '../../../redux/actions/auth';
const CreatePassword = (props) => {
  const {email} = props.route.params;
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');

  const dispatch = useDispatch();
  const _onSubmit = () => {
    // alert(email)
    // props.navigation.navigate("SignIn")
    const data = {email, password, passwordRepeat};
    dispatch(ForgotPassword(data, props));
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page} keyboardShouldPersistTaps="always">
        <Text style={[s.brand]}>ZWALLET</Text>
        <View style={[s.radiusTop, s.card]}>
          <Text style={s.title}>Reset Password</Text>
          <Text style={[s.subTitle]}>
            Create and confirm your new password so you can login to Zwallet.
          </Text>
          <InputBorderedBottom
            icon="lock"
            placeholder="Create new password"
            value={password}
            onChange={(text) => setPassword(text)}
            style={{marginVertical: 10}}
            secureTextEntry={true}
          />
          <InputBorderedBottom
            icon="lock"
            placeholder="Confirm new password"
            value={passwordRepeat}
            onChange={(text) => setPasswordRepeat(text)}
            style={{marginVertical: 10}}
            secureTextEntry={true}
          />
          <Button
            uppercase={false}
            style={s.button}
            mode="contained"
            onPress={_onSubmit}
            disabled={
              password.length < 1 ||
              passwordRepeat.length < 1 ||
              password !== passwordRepeat
            }>
            <Text style={{color: color.white}}>Reset Password</Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default CreatePassword;
