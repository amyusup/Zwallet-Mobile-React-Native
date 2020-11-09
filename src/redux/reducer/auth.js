import {
  SETAUTH,
  SETAUTHREGISTER,
  SETAUTHERROR,
  SETAUTHLOGOUT,
} from '../constant';

const initState = {
  token: '',
  role: '',
  error: '',
  isLogin: false,
};

const authReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SETAUTH:
      const {token, role} = payload;
      return {...state, token, role, isLogin: true};
    case SETAUTHREGISTER:
      // const {token, role} = payload;
      return {...state, payload, isLogin:false};

    case SETAUTHERROR:
      return {...state, error: payload};

    case SETAUTHLOGOUT:
      return {...state, token: '', role: '', isLogin:false, payload:''};

    default:
      return state;
  }
};

export default authReducer;
