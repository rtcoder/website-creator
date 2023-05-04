import {StoreEnhancer} from "redux";

export const updateStructureInLocalStorage: StoreEnhancer = (createStore) => {
    return (rootReducer, preloadedState) => {
        const store = createStore(rootReducer, preloadedState)

        function newDispatch(action) {
            const result = store.dispatch(action)
            const storeValue = store.getState() as any;
            localStorage.setItem('structure', JSON.stringify(storeValue.structure.structure))
            return result
        }

        return {...store, dispatch: newDispatch};
    }
}
