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
import {useDispatch} from 'react-redux';
import {AuthRegister} from '../../../redux/actions/auth';
const SignUp = (props) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const inputEmail = React.useRef();
  const inputPassword = React.useRef();
  const dispatch = useDispatch();

  const _onSubmit = () => {
    const data = {name, email, password};
    dispatch(AuthRegister(data, props));
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page} keyboardShouldPersistTaps="always">
        <Text style={[s.brand]}>ZWALLET</Text>
        <View style={[s.radiusTop, s.card]}>
          <Text style={s.title}>Sign Up</Text>
          <Text style={[s.subTitle]}>
            Create your account to access Zwallet.
          </Text>
          <InputBorderedBottom
            keyType="next"
            onSubmit={() => inputEmail.current.focus()}
            icon="user"
            placeholder="Enter your username"
            value={name}
            onChange={(text) => setName(text)}
            style={{marginVertical: 10}}
          />
          <InputBorderedBottom
            inputRef={inputEmail}
            keyType="next"
            onSubmit={() => inputPassword.current.focus()}
            icon="mail"
            placeholder="Enter your e-mail"
            value={email}
            onChange={(text) => setEmail(text)}
            style={{marginVertical: 10}}
          />
          <InputBorderedBottom
            inputRef={inputPassword}
            keyType="done"
            onSubmit={_onSubmit}
            icon="lock"
            placeholder="Create your password"
            value={password}
            onChange={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{marginVertical: 10}}
          />

          <Button
            disabled={name < 1 || email < 1 || password < 1 ? true : false}
            uppercase={false}
            style={[s.button, {position: 'relative', bottom: 0}]}
            mode="contained"
            onPress={_onSubmit}>
            <Text style={{color: color.white}}>Sign Up</Text>
          </Button>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text>Already have an account? Let’s</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignIn')}>
              <Text style={{color: color.primary}}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
