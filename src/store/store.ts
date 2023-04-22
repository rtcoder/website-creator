import {configureStore} from '@reduxjs/toolkit'
// ...
import structureReducer from "@/store/structureSlice";
import {updateStructureInLocalStorage} from "@/store/enhancers";

export const store = configureStore({
    reducer: {
        structure: structureReducer
    },
    enhancers: (defaultEnhancers) => defaultEnhancers.prepend(updateStructureInLocalStorage)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
