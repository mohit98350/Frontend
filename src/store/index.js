import {createStore , applyMiddleware , combineReducers} from 'redux';
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from './reducers/AuthReducers';
import {PostReducer , FetchPosts , FetchPost, UpdatePost,UpdateImage } from './reducers/PostReducer';
import {updateName} from "./reducers/ProfileReducer";
const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
    updateName
  
});
const middleware = [thunkMiddleware]
const Store = createStore(rootReducers,composeWithDevTools(applyMiddleware(...middleware)));
export default Store;