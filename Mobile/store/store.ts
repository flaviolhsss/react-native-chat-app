import { configureStore } from '@reduxjs/toolkit'
import reducer from './Reducers/reducer'

export const store = configureStore({
  reducer: {
    app_state: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //thunk: true,
      serializableCheck: {
        ignoredPaths: ['app_state.socket'], // Ignorer les chemins non sérialisables
        ignoredActions: ['app_state/setSocket'], // Ignorer les actions non sérialisables
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
