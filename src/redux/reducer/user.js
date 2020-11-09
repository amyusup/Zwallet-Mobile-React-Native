import {
  SETUSERDATA,
  SETBALANCE,
  SETHISTORYDATA,
  ADDHISTORYDATA,
  SETUSERERROR,
  SETTOPUPDATA,
  SETFINDUSERDATA,
  ADDFINDUSERDATA,
  SETFINDIDDATA,
  SETHISTORYIDDATA,
  SETPHOTO,
  SETPHONE,
  // SETPAYMENTTOKEN,
} from '../constant'

const initState = {
  error: "",
  paymentToken: "",
  userdata: {},
  history: {
    history: [],
    income: "",
    expense: "",
  },
  historyId: {},
  findUser: [],
  topup: [],
  findId: {}
}

const authReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case SETUSERDATA:
      return {
        ...state,
        userdata: payload
      }

    case SETBALANCE:
      return {
        ...state,
        userdata: {
          ...state.userdata,
          balance: state.userdata.balance - payload
        }
      }

    case SETPHOTO:
      return {
        ...state,
        userdata: {
          ...state.userdata,
          photo: payload
        }
      }

    case SETPHONE:
      return {
        ...state,
        userdata: {
          ...state.userdata,
          phone: payload
        }
      }

    case SETHISTORYDATA:
      return {
        ...state,
        history: payload
      }

    case ADDHISTORYDATA:
      return {
        ...state,
        history: { ...state.history, history: [...state.history.history, ...payload.history] }
      }

    case SETTOPUPDATA:
      return {
        ...state,
        topup: payload
      }

    case SETUSERERROR:
      return {
        ...state,
        error: payload
      }

    case SETFINDUSERDATA:
      return {
        ...state,
        findUser: payload
      }

    case ADDFINDUSERDATA:
      return {
        ...state,
        findUser: [...state.findUser, ...payload]
      }

    case SETFINDIDDATA:
      return {
        ...state,
        findId: payload
      }

    case SETHISTORYIDDATA:
      return {
        ...state,
        historyId: payload
      }

    // case SETPAYMENTTOKEN:
    //   return {
    //     ...state,
    //     paymentToken: payload
    //   }
    default:
      return state
  }
}

export default authReducer