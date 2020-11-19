import axios from '../../helpers/axios';
import {ToastAndroid} from 'react-native';
import {
  options,
  SETUSERDATA,
  SETAUTHLOGOUT,
  SETHISTORYDATA,
  SETUSERERROR,
  ADDHISTORYDATA,
  SETTOPUPDATA,
  ADDFINDUSERDATA,
  SETFINDUSERDATA,
  SETAUTHERROR,
  SETFINDIDDATA,
  SETHISTORYIDDATA,
  SETBALANCE,
  SETPHOTO,
  SETPHONE,
} from '../constant';

const handleError = (err, dispatch) => {
  if (!err.response) return dispatch(options(SETUSERERROR, 'Network Error'));
  ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
  dispatch(options(SETUSERERROR, err.response.data.message));
};

export const UserLoad = (token) => (dispatch) => {
  axios
    .get('/users/detail', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(options(SETUSERDATA, res.data.data));
      // if (!res.data.data.pin) history.push(`${isMobile}/auth/create-pin`);
      // else if (!res.data.data.phone)
      //   history.push(`${isMobile}/dashboard/profile/add_phone`);
    })
    .catch((_) => {
      dispatch(options(SETAUTHERROR, 'Sesi telah berakhir'));
      dispatch(options(SETAUTHLOGOUT));
      // return history.push("/auth");
    });
};

export const getHistories = (token, offset = 1, reset = true) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .get(`/users/histories?offset=${offset}&limit=4`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (reset) return dispatch(options(SETHISTORYDATA, res.data.data));
      return dispatch(options(ADDHISTORYDATA, res.data.data));
    })
    .catch((err) => handleError(err, dispatch));
};

export const resetHistories = () => (dispatch) =>
  dispatch(options(SETHISTORYDATA, []));
export const resetFindUsers = () => (dispatch) =>
  dispatch(options(SETFINDUSERDATA, []));

export const getHistoryId = (token, id, props) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .get(`/users/history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(options(SETHISTORYIDDATA, res.data.data)))
    .catch((err) => {
    ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT)
    handleError(err, dispatch)
    }
    );
};

export const getFindUsers = (token, offset = 1, name = null, reset = true) => (
  dispatch,
) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .get(`/users/search?q=${name}&offset=${offset}&limit=4`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (reset) return dispatch(options(SETFINDUSERDATA, res.data.data));
      return dispatch(options(ADDFINDUSERDATA, res.data.data));
    })
    .catch((err) => handleError(err, dispatch));
};

export const setPhoto = (token, data) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .post(`/users/photo`, data, {
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(options(SETPHOTO, res.data.data)))
    .catch((err) => {
      console.log(err);
      console.log(data);
    });
};

export const getFindId = (token, id) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(options(SETFINDIDDATA, res.data.data)))
    .catch((err) => handleError(err, dispatch));
};

export const balanceTransfer = 
(token, data, props) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .post('/users/transfer', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const amountTotal = data.total;
      const {  id,photo, name, phone, amount, note } = props.route.params;
      dispatch(options(SETBALANCE, amountTotal));
      // history.push(`${isMobile}/dashboard/transfer/status/${res.data.data.id}`);
      props.navigation.navigate('TransferStatus', {
        id: id,
        photo: photo,
        name: name,
        phone: phone,
        amount: amount,
        note: note,
        idHistory:res.data.data.id
      });
    })
    .catch((err) =>
      // console.log(err)
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT),
    );
};

export const deletePhone = (token, props) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .delete('/users/phone', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(options(SETPHONE, null));
      props.navigation.navigate('AddPhone');
    })
    .catch((err) => handleError(err, dispatch));
};

export const addPhone = (token, phone, props) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .patch(
      '/users/phone',
      {phone},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      dispatch(options(SETPHONE, phone));
      props.navigation.navigate('PersonalInfo');
    })
    .catch((err) => handleError(err, dispatch));
};

export const addPhoneMobile = (token, phone, history) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .patch(
      '/users/phone',
      {phone},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      dispatch(options(SETPHONE, phone));
      history.replace(`/m/dashboard/profile/info`);
    })
    .catch((err) => handleError(err, dispatch));
};

export const changePassword = (token, data, props) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .patch('/users/password', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      props.navigation.navigate('Profile');
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
    })
    .catch((err) => {
      handleError(err, dispatch)
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT); 
    })
};

export const createPin = (token, pin, props) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .patch(
      '/users/create_pin',
      {pin},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      props.navigation.navigate('Profile')
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
    })
    .catch((err) => {
      handleError(err, dispatch)
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
    });
};
export const checkPin = (token, pin, props) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));

  axios
    .patch(
      '/users/check-pin',
      {pin},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => props.navigation.navigate('ChangePin'))
    .catch((err) => {
      handleError(err, dispatch)
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
    })
};

export const getTopup = (token) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));
  axios
    .get('/users/guide-topup', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    .then((res) => dispatch(options(SETTOPUPDATA, res.data.data)))
    .catch((err) => {
      if (!err.response)
        return dispatch(options(SETUSERERROR, 'Network Error'));
      dispatch(options(SETUSERERROR, err.response.data.message));
    });
};

export const deleteTopup = (token, id, history) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));
  axios
    .delete(`/admin/topup/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      dispatch(options(SETPHONE, null));
      alert('Delete Top Up Successfully');
      history.push(`/admin/topup/add`);
    })
    .catch((err) => handleError(err, dispatch));
};

export const addTopup = (token, detail, history) => (dispatch) => {
  dispatch(options(SETUSERERROR, ''));
  axios
    .post(
      `/admin/topup`,
      {detail},
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    )
    .then((res) => {
      dispatch(options(SETPHONE, null));
      alert('Add Top Up Successfully');
      history.replace(`/admin/topup`);
    })
    .catch((err) => handleError(err, dispatch));
};

export const getPaymentToken = (token, amount) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        '/users/get-token',
        {amount},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => resolve(res.data.data.token))
      .catch((err) => reject(err.message));
  });
};

export const processPayment = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/users/process-topup', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data.data.id))
      .catch((err) => reject(err.message));
  });
};

export const getHistoryTopup = (token, history, order_id) => (dispatch) => {
  dispatch(options(SETHISTORYIDDATA, {}));
  return axios
    .get(`/users/history/topup?order_id=${order_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => dispatch(options(SETHISTORYIDDATA, response.data.data)))
    .catch((error) => history.replace('/404'));
};
