import { UPDATEUSER, SETFINDIDDATA, SETALERTDIMISS, SETUSERADMIN, SETUSERADMINERROR } from "../constant";

const initState = {
  updateUser: [],
  UserAdd: []
};

const adminReducer = (state = initState, action) => {
  const { type, payload } = action;


  switch (type) {
    
    case SETFINDIDDATA:
      return {
        ...state,
        findId: payload,
      };
    case UPDATEUSER:
      return {
        ...state,
        updateUser: payload,
      };
    case SETALERTDIMISS:
      return {
        ...state,
        updateUser: "",
      };

      case SETUSERADMIN:
        return { 
          ...state, 
          UserAdd : payload 
        }
  
      case SETUSERADMINERROR:
        return { 
          ...state, 
          error: payload }

    default:
      return state;
  }
};

export default adminReducer;
