// store/index.js
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth_reducer from './reducers/auth_reducer'
import call_reducer from './reducers/call_reducer'
import chat_reducer from './reducers/chat_reducer'
import contacts_reducer from './reducers/contacts_reducer'
import dashboard_reducer from './reducers/dashboard_reducer'
import pricing_reducer from './reducers/pricing_reducer'
import stream_reducer from './reducers/stream_reducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['chat', 'dashboard', 'auth', 'call'],
}

const reducers = combineReducers({
  chat: chat_reducer,
  dashboard: dashboard_reducer,
  auth: auth_reducer,
  contacts: contacts_reducer,
  pricing: pricing_reducer,
  stream: stream_reducer,
  call: call_reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store

export let persistor = persistStore(store)
