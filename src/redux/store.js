// import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import reducers from './reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ["Auth"]
}

const persistReducers = persistReducer(persistConfig, reducers)
const store = createStore(persistReducers, applyMiddleware(thunk, logger))
const persistor = persistStore(store)

export { store, persistor }