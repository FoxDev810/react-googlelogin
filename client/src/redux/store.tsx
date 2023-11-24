import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createStore, applyMiddleware, AnyAction } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import rootReducer from './reducers/index'
import  { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default store;