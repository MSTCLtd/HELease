import { createSlice, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

const HELSlice = createSlice({
    name: 'HELSlice',
    initialState: {
        user: null,
        adminUser: null,
        language: 'en',
        seller: null
    },
    reducers: {
        setUser(state, payload) {
            state.user = payload.payload
        },
        setAdminUser(state, payload) {
            state.adminUser = payload.payload
        },
        setLanguage(state, payload) {
            state.language = payload.payload
        },
        setSeller(state, payload) {
            state.seller = payload.payload
        }
    }
})

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: process.env.SECRET || '7ef00fce647b2a0616a3dcff5506012dccf964ce',
            onError: error => console.log(error)
        })
    ]
}

const persistedReducer = persistReducer(persistConfig, HELSlice.reducer)

const store = configureStore({
    reducer: {
        HELReducer: persistedReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export default store
export const HELActions = HELSlice.actions