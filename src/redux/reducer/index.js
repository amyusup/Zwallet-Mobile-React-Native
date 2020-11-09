import User from './user'
import Auth from './auth'
import Admin from './admin'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage'

const authConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["token", "role"]
}

export default combineReducers({ Admin, User, Auth: persistReducer(authConfig, Auth) })