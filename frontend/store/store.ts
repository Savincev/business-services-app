import { configureStore } from '@reduxjs/toolkit'

import contactsSlice from './contactsSlice'

const store = configureStore({
    reducer: {
        contacts: contactsSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;