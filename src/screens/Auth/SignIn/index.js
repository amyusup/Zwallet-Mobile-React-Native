import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {InputBorderedBottom} from '../../../components/Input';
import s from '../style';
import color from '../../../styles/constant';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AuthLogin} from '../../../redux/actions/auth';
const SignIn = (props) => {
  const [email, setEmail] = React.useState('admin@gmail.com');
  const [password, setPassword] = React.useState('123123');
  const inputPassword = React.useRef()
  const dispatch = useDispatch();
  const { deviceToken } = useSelector(state => state.User)

  const _onSubmit = () => {
    dispatch(AuthLogin({email, password, device:deviceToken}));
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page} keyboardShouldPersistTaps='always'>
        <Text style={[s.brand]}>ZWALLET</Text>
        <View style={[s.radiusTop, s.card]}>
          <Text style={s.title}>Sign In</Text>
          <Text style={[s.subTitle]}>
            Login to your existing account to access all the features in
            Zwallet.
          </Text>
          <InputBorderedBottom
            keyType="next"
            onSubmit={() => inputPassword.current.focus()}
            icon="mail"
            placeholder="Enter your e-mail"
            value={email}
            onChange={(text) => setEmail(text)}
            style={{marginVertical: 10}}
            returnKeyType="send"
          />
          
          <InputBorderedBottom
           inputRef={inputPassword}
            keyType="done"
            onSubmit={_onSubmit}
            icon="lock"
            placeholder="Enter your password"
            value={password}
            onChange={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{marginVertical: 10}}
          />

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgotPassword')}
            style={[
              {alignSelf: 'flex-end', marginVertical: 10, color: color.dark},
            ]}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
          <Button
            disabled={email < 1 || password < 1 ? true : false}
            uppercase={false}
            style={[s.button, {position: 'relative', bottom: 0}]}
            mode="contained"
            onPress={_onSubmit}>
            <Text style={{color: color.white}}>Sign In</Text>
          </Button>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text>Don’t have an account? Let’s</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={{color: color.primary}}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
