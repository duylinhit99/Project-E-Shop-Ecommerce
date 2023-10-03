import { combineReducers } from "redux";
import cartReducer from "./cart";

// tập hợp các reducer
const rootReducer = combineReducers({
    cart : cartReducer
})

export default rootReducer;