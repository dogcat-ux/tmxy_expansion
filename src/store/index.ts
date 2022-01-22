import {createStore, applyMiddleware} from "redux";
// composeWithDevTools()  redux调试工具
// import {composeWithDevTools} from 'redux-devtools-extension'
// thunk中间件  dispath()能够传入函数执行异步请求
import thunk from 'redux-thunk';
// combineReducers 合并各个reducer
import {combineReducers} from 'redux'
import userReducer from "./user";
// 创建store 传入合并后的reducer
const store = createStore(combineReducers({
  user:userReducer
}), applyMiddleware(thunk))
// const store = createStore(userReducer, applyMiddleware(thunk))
// const store = createStore(userReducer)
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
