import axios from '../../helpers/axios';
import {ToastAndroid} from 'react-native';
import {
  SETAUTH,
  SETAUTHLOGOUT,
  SETAUTHERROR,
  options,
  SETAUTHREGISTER,
} from '../constant';

export const AuthLogin = (data) => (dispatch) => {
  axios
    .post('/auth/login', data)
    .then((res) => {
      dispatch(options(SETAUTH, res.data.data));
      dispatch(options(SETAUTHERROR, ''));
      // if (res.data.data.role !== 'admin') return history.push("/dashboard")

      // return navigate("Main")
    })
    .catch((err) => {
      if (!err.response)
        return dispatch(options(SETAUTHERROR, 'Network Error'));
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
      dispatch(options(SETAUTHERROR, err.response.data.message));
    });
};

export const AuthRegister = (data, props) => (dispatch) => {
  // const isMobile = mobile ? "/m/auth/create-pin" : ""
  axios
    .post('/auth/register', data)
    .then((res) => {
      dispatch(options(SETAUTHREGISTER, res.data.data));
      dispatch(options(SETAUTHERROR, ''));
      props.navigation.navigate('CreatePin');
    })
    .catch((err) => {
      if (!err.response)
        return dispatch(options(SETAUTHERROR, 'Network Error'));
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
      dispatch(options(SETAUTHERROR, err.response.data.message));
    });
};

export const AuthLogout = (email) => (dispatch) => {
  // dispatch(options(SETAUTHLOGOUT));
  // rdispatch(options(SETAUTHLOGOUT))eturn props.navigation.navigate(props.navigation.state.routeName)
  axios
    .post('/auth/logout', email)
    .then((res) => {
      dispatch(options(SETAUTHLOGOUT));
      // ToastAndroid.show(res.data.data, ToastAndroid.SHORT);
    })
    .catch((err) => {
      if (!err.response)
        return dispatch(options(SETAUTHERROR, 'Network Error'));
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
      dispatch(options(SETAUTHERROR, err.response.data.message));
    });
};
export const ForgotPassword = (data, props) => (dispatch) => {
  axios
    .post('/auth/forgot-password', data)
    .then((res) => {
      // dispatch(options(SETAUTHLOGOUT));
      // ToastAndroid.show(res.data.data, ToastAndroid.SHORT);
      // alert('sukses')
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
      props.navigation.navigate('SignIn');
    })
    .catch((err) => {
      if (!err.response)
        return dispatch(options(SETAUTHERROR, 'Network Error'));
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
      dispatch(options(SETAUTHERROR, err.response.data.message));
      props.navigation.navigate('ForgotPassword');
    });
};
