import React from 'react';
import {StatusBar, ScrollView, Text, View, Dimensions} from 'react-native';
import s from '../style';
import color from '../../../styles/constant';
import {InputBorderedBottom} from '../../../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import { changePassword } from '../../../redux/actions/user'
import {Button} from 'react-native-paper';
const index = (props) => {
  const {token} = useSelector((state) => state.Auth);
  const [currPassword, setCurrPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const dispatch = useDispatch();

  const inputPassword = React.useRef();
  const inputPasswordRepeat = React.useRef();

  const _onSubmit = async () => {
    const data = { password:currPassword, passwordNew:password, passwordNewRepeat:passwordRepeat }
    dispatch(changePassword(token, data, props))
  }
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView
        style={s.page}
        style={s.page}
        keyboardShouldPersistTaps="always">
        <View style={{marginHorizontal: 15}}>
          <Text>
            You must enter your current password and then type your new password
            twice.
          </Text>
          <InputBorderedBottom
            keyType="next"
            onSubmit={() => inputPassword.current.focus()}
            icon="lock"
            placeholder="Current Password"
            value={currPassword}
            onChange={(text) => setCurrPassword(text)}
            style={{marginVertical: 10}}
            secureTextEntry={true}
          />
          <InputBorderedBottom
            inputRef={inputPassword}
            keyType="next"
            onSubmit={() => inputPasswordRepeat.current.focus()}
            icon="lock"
            placeholder="New Password"
            value={password}
            onChange={(text) => setPassword(text)}
            style={{marginVertical: 10}}
            secureTextEntry={true}
          />
          <InputBorderedBottom
            inputRef={inputPasswordRepeat}
            keyType="done"
            onSubmit={_onSubmit}
            icon="lock"
            placeholder="Repeat Password"
            value={passwordRepeat}
            onChange={(text) => setPasswordRepeat(text)}
            style={{marginVertical: 10}}
            secureTextEntry={true}
          />
        </View>
      </ScrollView>
      <Button
        disabled={
          currPassword < 4 || password < 4 || passwordRepeat < 4 ? true : false
        }
        uppercase={false}
        style={[s.button100]}
        mode="contained"
        onPress={_onSubmit}>
        <Text style={{color: color.white}}>Submit</Text>
      </Button>
    </>
  );
};
export default index;
